import type { QuizSubmission } from "@app/types";
import { createContext, useContext } from "react";

export type QuizContextValue = {
  userAnswer: string;
  handleAnswerChange: (newAnswer: string) => void;
  submission: QuizSubmission | null;
};

export const QuizContext = createContext<QuizContextValue | null>(
  null,
);

export function useQuizContext() {
  const contextValue = useContext(QuizContext);
  if (!contextValue) {
    throw new Error("Should use the quiz answer context inside its provider");
  }

  return contextValue;
}
