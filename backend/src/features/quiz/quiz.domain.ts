import {
  QuizGiveUp,
  QuizSubmission,
} from "@app/types";

export const canRevealQuizAnswer = (quizAnswer: {
  submissions: Pick<QuizSubmission, "id">[];
  giveUps: Pick<QuizGiveUp, "id">[];
}): boolean =>
  quizAnswer.submissions.length > 0 || quizAnswer.giveUps.length > 0;
