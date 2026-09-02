import type { QuizSubmission, ResponseError } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const getMyQuizSubmissions = async (
  quizAnswerId: number,
): Promise<{ submissions: QuizSubmission[] }> => {
  const response = await apiClient.get(
    `/me/quizzes/${quizAnswerId}/submissions`,
  );

  return response.data;
};

export function useMyQuizSubmissions(quizAnswerId: number) {
  const { data, isLoading, error } = useQuery<
    { submissions: QuizSubmission[] },
    AxiosError<ResponseError>
  >({
    queryKey: ["me", "quizzes", quizAnswerId, "submissions"],
    queryFn: () => getMyQuizSubmissions(quizAnswerId),
  });

  useEffect(() => {
    if (error) {
      toast.error(`فشل في جلب إرسالات الاختبار: ${getErrorMessage(error)}`);
    }
  }, [error]);

  const submissions = data ? data.submissions : [];

  return { submissions, isLoading, error };
}
