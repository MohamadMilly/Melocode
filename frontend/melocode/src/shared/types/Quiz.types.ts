import type { Language } from "./languages.types";

export type QuizQuestionItem = {
  type: "text" | "note" | "code" | "hint" | "options";
  content: string;
  language?: Language;
  isInteractive?: boolean;
  options?: string[];
};

export type QuizQuestion = {
  items: QuizQuestionItem[];
};

export type QuizLevelType = "easy" | "hard" | "medium";

export type QuizBadgeType =
  | "Write"
  | "Debug"
  | "Fix"
  | "Theory"
  | "Multiple Choice";

export type QuizType = "CODING" | "MULTIPLE_CHOICE";

export type QuizData = {
  badge: QuizBadgeType;
  type: QuizType;
  quizId: string;
  question: QuizQuestion;
  level: QuizLevelType;
};
