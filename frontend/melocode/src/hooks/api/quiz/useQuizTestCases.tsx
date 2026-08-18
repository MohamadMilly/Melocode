import type { QuizTestCase } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";

const getQuizTestCases = async (
  quizAsnwerId: number,
): Promise<{ testCases: Omit<QuizTestCase, "output">[] }> => {
  const response = await apiClient.get(`/quizzes/${quizAsnwerId}/test-cases`);
  return response.data;
};

export function useQuizTestCase(quizAnswerId: number) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["quizzes", quizAnswerId, "test-cases"],
    queryFn: () => getQuizTestCases(quizAnswerId),
    enabled: false,
  });

  const testCases = data ? data?.testCases : [];

  return { testCases, isLoading, error, refetch };
}
