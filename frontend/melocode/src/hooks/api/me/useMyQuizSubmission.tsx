import type { QuizSubmission, ResponseError } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const getMyQuizSubmissions = async (
  quizId: string,
): Promise<{ submissions: QuizSubmission[] }> => {
  const response = await apiClient.get(`/me/quizzes/${quizId}/submissions`);

  return response.data;
};

export function useMyQuizSubmissions(quizId: string) {
  const { data, isLoading, error } = useQuery<
    { submissions: QuizSubmission[] },
    AxiosError<ResponseError>
  >({
    queryKey: ["me", "quizzes", quizId, "submissions"],
    queryFn: () => getMyQuizSubmissions(quizId),
  });

  useEffect(() => {
    if (error) {
      toast.error(`فشل في جلب إرسالات الاختبار: ${getErrorMessage(error)}`);
    }
  }, [error]);

  const submissions = data ? data.submissions : [];

  return { submissions, isLoading, error };
}
