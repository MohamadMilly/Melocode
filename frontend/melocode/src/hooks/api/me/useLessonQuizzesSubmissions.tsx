import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/api";
import type { GetLessonQuizzesSubmissionsResponse } from "@app/types";

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
  const { data, isLoading, error } = useQuery({
    queryKey: ["lessons", lessonId, "submissions"],
    queryFn: () => getLessonQuizzesSubmissions(lessonId, isCorrect),

    enabled: typeof lessonId === "number" && !isNaN(lessonId),
  });

  const submissionsData = data?.submissionsData ?? [];

  return { submissionsData, isLoading, error };
}
