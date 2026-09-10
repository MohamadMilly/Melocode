import type {
  GetLessonResponse,
  ResponseError,
  UserLessonProgress,
} from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const getLesson = async (lessonId: number): Promise<GetLessonResponse> => {
  const response = await apiClient.get<GetLessonResponse>(
    `/lessons/${lessonId}`,
  );

  return response.data;
};

export function useLesson(lessonId: number | undefined) {
  const { data, isLoading, error } = useQuery<
    GetLessonResponse,
    AxiosError<ResponseError>
  >({
    queryKey: ["me", "lessons", lessonId],
    queryFn: () => getLesson(lessonId as number),
    enabled: !!lessonId,
  });

  useEffect(() => {
    if (error) {
      toast.error(`فشل في جلب معلومات و تقدم الدرس: ${getErrorMessage(error)}`);
    }
  }, [error]);

  const progress = (data?.progress ?? null) as UserLessonProgress | null;
  const hasCompletedAllQuizzes = data?.hasCompletedAllQuizzes ?? false;
  const lesson = data?.lesson ?? null;
  const nextLessonSlug = data?.nextLessonSlug ?? "";
  const nextLessonStatus = data?.nextLessonStatus ?? null;
  const previousLessonSlug = data?.previousLessonSlug ?? "";
  const previousLessonStatus = data?.previousLessonStatus ?? null;
  return {
    progress,
    lesson,
    hasCompletedAllQuizzes,
    isLoading,
    error,
    nextLessonSlug,
    nextLessonStatus,
    previousLessonSlug,
    previousLessonStatus,
  };
}
