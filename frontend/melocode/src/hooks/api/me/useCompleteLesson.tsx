import { apiClient } from "../../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  GetLessonResponse,
  ResponseError,
  UserLessonProgress,
} from "@app/types";
import { useAuth } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const completeLesson = async (
  lessonId: number,
): Promise<{ progress: UserLessonProgress }> => {
  const response = await apiClient.post(`/me/lessons/${lessonId}/progress`);

  return response.data;
};

export function useCompleteLesson() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<
    { progress: UserLessonProgress },
    AxiosError<ResponseError>,
    number
  >({
    mutationKey: ["complete-lesson"],
    mutationFn: completeLesson,
    onSuccess: (data, lessonId) => {
      queryClient.setQueryData<GetLessonResponse>(
        ["me", "lessons", lessonId],
        (old: GetLessonResponse | undefined) => {
          if (!old) return;

          return {
            ...old,
            hasCompletedAllQuizzes: true,
            progress: data.progress,
          } satisfies GetLessonResponse;
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
