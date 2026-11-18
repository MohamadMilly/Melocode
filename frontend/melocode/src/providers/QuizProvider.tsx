import {

  QuizContext,
  type QuizContextValue,
} from "../contexts/QuizContext";

export function QuizProvider({
  userAnswer,
  handleAnswerChange,
  submission,
  children,
}: QuizContextValue & { children: React.ReactNode }) {
  return (
    <QuizContext.Provider
      value={{ userAnswer, handleAnswerChange, submission }}
    >
      {children}
    </QuizContext.Provider>
  );
}
