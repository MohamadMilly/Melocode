import { apiClient } from "../../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  LessonProgressResponse,
  ResponseError,
  UserLessonProgress,
} from "@app/types";
import { useAuth } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const completeLesson = async (
  lessonId: number,
): Promise<{ hasCompleted: boolean }> => {
  const response = await apiClient.post<{ hasCompleted: boolean }>(
    `/me/lessons/${lessonId}/progress`,
  );

  return response.data;
};

export function useCompleteLesson() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    { hasCompleted: boolean },
    AxiosError<ResponseError>,
    number
  >({
    mutationKey: ["complete-lesson"],
    mutationFn: completeLesson,
    onSuccess: (data, lessonId) => {
      if (!data.hasCompleted) {
        return;
      }

      queryClient.setQueryData<{
        hasCompletedAllQuizzes: boolean;
        progress: UserLessonProgress | null;
      }>(
        ["me", "lessons", lessonId, "progress"],
        (old: LessonProgressResponse | undefined) => {
          const now = new Date();
          const existingProgress = old?.progress ?? {
            id: 0,
            lessonId,
            userId: user?.id ?? 0,
            completedAt: now,
          };

          return {
            hasCompletedAllQuizzes: true,
            progress: {
              ...existingProgress,
              lessonId,
              completedAt: now,
            },
          } satisfies LessonProgressResponse;
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["lessons"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["progresses", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(`فشل في إكمال الدرس: ${message}`);
    },
  });
}
