import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/api";
import type {
  GetLessonQuizzesSubmissionsResponse,
  ResponseError,
} from "@app/types";
import { useAuth } from "../../../contexts/AuthContext";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

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
  const { data, isLoading, error } = useQuery<
    GetLessonQuizzesSubmissionsResponse,
    AxiosError<ResponseError>
  >({
    queryKey: ["me", "lessons", lessonId, "submissions"],
    queryFn: () => getLessonQuizzesSubmissions(lessonId, isCorrect),
    enabled: typeof lessonId === "number" && !isNaN(lessonId) && !!user,
  });

  useEffect(() => {
    if (error) {
      toast.error(`فشل في جلب إرسالات الأسئلة: ${getErrorMessage(error)}`);
    }
  }, [error]);

  const submissionsData = data?.submissionsData ?? [];

  return { submissionsData, isLoading, error };
}
