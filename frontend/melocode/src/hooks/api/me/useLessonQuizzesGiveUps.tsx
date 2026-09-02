import type {
  GetLessonQuizzesGiveUpsResponse,
  ResponseError,
} from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const getCurrentUserLessonQuizzesGivUps = async (
  lessonId: number,
): Promise<GetLessonQuizzesGiveUpsResponse> => {
  const response = await apiClient.get(`/me/lessons/${lessonId}/giveups`);

  return response.data;
};

export function useLessonQuizzesGiveUps(lessonId: number) {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<
    GetLessonQuizzesGiveUpsResponse,
    AxiosError<ResponseError>
  >({
    queryKey: ["me", "lessons", lessonId, "giveUps"],
    queryFn: () => getCurrentUserLessonQuizzesGivUps(lessonId),
    enabled: !!lessonId && !!user,
  });

  useEffect(() => {
    if (error) {
      toast.error(`فشل في جلب الاستسلامات: ${getErrorMessage(error)}`);
    }
  }, [error]);

  const giveUpsData = data?.giveUpsData ?? [];

  return { giveUpsData, isLoading, error };
}
