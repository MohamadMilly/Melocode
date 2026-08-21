import type { LessonProgressResponse, UserLessonProgress } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const getMyLessonProgress = async (
  lessonId: number,
): Promise<LessonProgressResponse> => {
  const response = await apiClient.get<LessonProgressResponse>(
    `/me/lessons/${lessonId}/progress`,
  );
  
  return response.data;
};

export function useMyLessonProgress(lessonId: number | undefined) {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<
    LessonProgressResponse,
    AxiosError<{ message: string }>
  >({
    queryKey: ["me", "lessons", lessonId, "progress"],
    queryFn: () => getMyLessonProgress(lessonId as number),
    enabled: !!lessonId && !!user,
  });

  const progress = (data?.progress ?? null) as UserLessonProgress | null;
  const hasCompletedAllQuizzes = data?.hasCompletedAllQuizzes ?? false;

  return {
    progress,
    hasCompletedAllQuizzes,
    isLoading,
    error,
  };
}
