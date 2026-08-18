import type { QuizSubmission } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";

const getMyQuizSubmissions = async (
  quizAnswerId: number,
): Promise<{ submissions: QuizSubmission[] }> => {
  const response = await apiClient.get(
    `/me/quizzes/${quizAnswerId}/submissions`,
  );

  return response.data;
};

export function useMyQuizSubmissions(quizAnswerId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["me", "quizzes", quizAnswerId, "submissions"],
    queryFn: () => getMyQuizSubmissions(quizAnswerId),
  });
  const submissions = data ? data.submissions : [];

  return { submissions, isLoading, error };
}
