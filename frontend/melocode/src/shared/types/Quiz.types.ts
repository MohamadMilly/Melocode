export type QuizQuestionItem = {
  type: "text" | "note" | "code" | "hint";
  content: string;
  language?: string;
};
export type QuizQuestion = {
  items: QuizQuestionItem[];
};

export type QuizLevelType = "easy" | "hard" | "medium";

export type QuizBadgeType = "Write" | "Debug" | "Fix" | "Theory";

export type QuizData = {
  badge: QuizBadgeType;
  answerId: number;
  question: QuizQuestion;
  level: QuizLevelType;
};
