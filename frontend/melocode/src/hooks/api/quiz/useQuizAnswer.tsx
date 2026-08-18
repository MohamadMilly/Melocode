import type { QuizAnswer, ResponseError } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const getQuizAnswer = async (answerId: number) => {
  const response = await apiClient.get<{ quizAnswer: QuizAnswer }>(
    `/quizzes/${answerId}`,
  );
  return response.data;
};

export function useQuizAnswer(answerId: number, completed: boolean) {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useQuery<
    { quizAnswer: QuizAnswer },
    AxiosError<ResponseError>
  >({
    queryKey: ["quizzes", answerId],
    queryFn: () => getQuizAnswer(answerId),
    enabled: !!answerId && !!user && completed,
    retry: false,
  });
  const answer = data ? data.quizAnswer : null;
  return { answer, isLoading, error, refetch };
}
