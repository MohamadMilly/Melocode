import type { GetLessonQuizzesGiveUpsResponse } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";

const getCurrentUserLessonQuizzesGivUps = async (
  lessonId: number,
): Promise<GetLessonQuizzesGiveUpsResponse> => {
  const response = await apiClient.get(`/me/lessons/${lessonId}/giveups`);

  return response.data;
};

export function useLessonQuizzesGiveUps(lessonId: number) {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["me", "lessons", lessonId, "giveUps"],
    queryFn: () => getCurrentUserLessonQuizzesGivUps(lessonId),
    enabled: !!lessonId && !!user,
  });

  const giveUpsData = data?.giveUpsData ?? [];

  return { giveUpsData, isLoading, error };
}
