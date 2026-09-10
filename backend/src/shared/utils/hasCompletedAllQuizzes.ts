import { QuizAnswer, QuizGiveUp, QuizSubmission } from "@app/types";

export function hasCompletedAllQuizzes(
  quizzes: (Omit<QuizAnswer, "items"> & {
    giveUps: QuizGiveUp[];
    submissions: QuizSubmission[];
  })[],
) {
  return quizzes.every(
    (quiz) => quiz.submissions.length >= 1 || quiz.giveUps.length >= 1,
  );
}
