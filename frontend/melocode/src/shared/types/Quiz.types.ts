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

export type QuizType = "CODING" | "MULTIPLE_CHOICE";

export type QuizData = {
  badge: QuizBadgeType;
  type: QuizType;
  answerId: number;
  question: QuizQuestion;
  level: QuizLevelType;
};
