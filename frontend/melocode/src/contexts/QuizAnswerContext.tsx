import type { QuizSubmission } from "@app/types";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type QuizAnswerContextValue = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  submission: QuizSubmission | null | undefined;
};

export const QuizAnswerContext = createContext<QuizAnswerContextValue | null>(
  null,
);

export function useQuizAnswerContext() {
  const contextValue = useContext(QuizAnswerContext);
  if (!contextValue) {
    throw new Error("Should use the quiz answer context inside its provider");
  }

  return contextValue;
}
