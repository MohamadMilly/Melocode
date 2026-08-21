import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/api";
import type { GetLessonQuizzesSubmissionsResponse } from "@app/types";
import { useAuth } from "../../../contexts/AuthContext";

const getLessonQuizzesSubmissions = async (
  lessonId: number,
  isCorrect?: boolean,
): Promise<GetLessonQuizzesSubmissionsResponse> => {
  const { data } = await apiClient.get<GetLessonQuizzesSubmissionsResponse>(
    `/me/lessons/${lessonId}/submissions`,
    {
      params: { isCorrect },
    },
  );

  return data;
};

export function useMyLessonSubmissions(lessonId: number, isCorrect?: boolean) {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["me", "lessons", lessonId, "submissions"],
    queryFn: () => getLessonQuizzesSubmissions(lessonId, isCorrect),

    enabled: typeof lessonId === "number" && !isNaN(lessonId) && !!user,
  });

  const submissionsData = data?.submissionsData ?? [];

  return { submissionsData, isLoading, error };
}
