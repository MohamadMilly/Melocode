import {
  QuizAnswerContext,
  type QuizAnswerContextValue,
} from "../contexts/QuizAnswerContext";

export function QuizAnswerProvider({
  code,
  setCode,
  selectedOption,
  setSelectedOption,
  children,
}: QuizAnswerContextValue & { children: React.ReactNode }) {
  return (
    <QuizAnswerContext.Provider
      value={{ code, setCode, selectedOption, setSelectedOption }}
    >
      {children}
    </QuizAnswerContext.Provider>
  );
}
