export type QuizQuestionItem = {
  type: "text" | "note" | "code" | "hint" | "options";
  content: string;
  language?: string;
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

export type QuizData = {
  badge: QuizBadgeType;
  answerId: number;
  question: QuizQuestion;
  level: QuizLevelType;
};
