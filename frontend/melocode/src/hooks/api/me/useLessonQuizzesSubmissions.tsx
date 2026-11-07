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
  slug: string,
  isCorrect?: boolean,
): Promise<GetLessonQuizzesSubmissionsResponse> => {
  const { data } = await apiClient.get<GetLessonQuizzesSubmissionsResponse>(
    `/me/lessons/${slug}/submissions`,
    {
      params: { isCorrect },
    },
  );

  return data;
};

export function useMyLessonSubmissions(slug: string, isCorrect?: boolean) {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<
    GetLessonQuizzesSubmissionsResponse,
    AxiosError<ResponseError>
  >({
    queryKey: ["me", "lessons", slug, "submissions"],
    queryFn: () => getLessonQuizzesSubmissions(slug, isCorrect),
    enabled: !!slug && !!user,
  });

  useEffect(() => {
    if (error) {
      toast.error(`فشل في جلب إرسالات الأسئلة: ${getErrorMessage(error)}`);
    }
  }, [error]);

  const submissionsData = data?.submissionsData ?? [];

  return { submissionsData, isLoading, error };
}
