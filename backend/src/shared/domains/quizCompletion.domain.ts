import type { QuizGiveUp, QuizSubmission } from "@app/types";

export const hasCompletedAllQuizzes = (
  quizAnswers: {
    submissions: Pick<QuizSubmission, "id">[];
    giveUps: Pick<QuizGiveUp, "id">[];
  }[],
): boolean =>
  quizAnswers.every(
    ({ submissions, giveUps }) => submissions.length > 0 || giveUps.length > 0,
  );
