export type QuizIdParams = {
  external_quizId: string;
};

export type LessonSlugParams = {
  slug: string;
};

export type GetLessonQuizSubmissionsQuery = {
  isCorrect: "true" | "false";
};
