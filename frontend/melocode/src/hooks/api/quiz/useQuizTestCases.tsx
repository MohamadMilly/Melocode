import type { QuizTestCase, ResponseError } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const getQuizTestCases = async (
  quizId: string,
): Promise<{ testCases: Omit<QuizTestCase, "output">[] }> => {
  const response = await apiClient.get(`/quizzes/${quizId}/test-cases`);
  return response.data;
};

export function useQuizTestCase(quizId: string) {
  const { data, isLoading, error, refetch } = useQuery<
    { testCases: Omit<QuizTestCase, "output">[] },
    AxiosError<ResponseError>
  >({
    queryKey: ["quizzes", quizId, "test-cases"],
    queryFn: () => getQuizTestCases(quizId),
    enabled: false,
  });

  const testCases = data ? data?.testCases : [];

  return { testCases, isLoading, error, refetch };
}
