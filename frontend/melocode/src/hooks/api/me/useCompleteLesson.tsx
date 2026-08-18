import { apiClient } from "../../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserLessonProgress } from "@app/types";

const completeLesson = async (
  lessonId: number,
): Promise<{ hasCompleted: boolean }> => {
  const response = await apiClient.post<{ hasCompleted: boolean }>(
    `/me/lessons/${lessonId}/progress`,
  );

  return response.data;
};

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation<
    { hasCompleted: boolean },
    AxiosError<{ message: string }>,
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
      }>(["me", "lessons", lessonId, "progress"], (old) => {
        const now = new Date().toISOString();
        const existingProgress = old?.progress ?? {
          id: 0,
          lessonId,
          userId: 0,
          completedAt: now,
        };

        return {
          hasCompletedAllQuizzes: true,
          progress: {
            ...existingProgress,
            lessonId,
            completedAt: now,
          },
        };
      });

      queryClient.invalidateQueries({
        queryKey: ["me", "lessons", lessonId, "progress"],
        exact: true,
      });
    },
  });
}
