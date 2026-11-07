import { HttpError } from "../shared/errors/HttpError.js";
import { canGiveUp } from "../domains/quiz.domain.js";
import { submissionRepository } from "../repositories/submission.repository.js";
import { giveUpRepository } from "../repositories/giveup.repository.js";
import { quizRepository } from "../repositories/quiz.repository.js";

export const giveUpToQuiz = async (external_quizId: string, userId: number) => {
  try {
    const quiz =
      await quizRepository.findQuizAnswerByExternalId(external_quizId);
    if (!quiz) {
      throw new HttpError(404, "لم يتم العثور على هذا الاختبار");
    }
    const quizAnswerId = quiz.id;
    const existingCorrectSubmission =
      await submissionRepository.findCorrectSubmissionForUser(
        userId,
        quizAnswerId,
      );
    if (!canGiveUp(Boolean(existingCorrectSubmission))) {
      throw new HttpError(400, "لا يمكن الاستسلام عن تمرين محلول مسبقا");
    }

    const giveUp = await giveUpRepository.createGiveUp(userId, quizAnswerId);
    return giveUp;
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new HttpError(400, "You have already given up to this lesson");
    }
    if (err.code === "P2003") {
      throw new HttpError(
        500,
        `Foreign key constraint error: ${err.meta?.field_name ?? "Unknown"} does not exist`,
      );
    } else {
      throw err;
    }
  }
};

export const getUserQuizGiveUp = async (
  userId: number,
  external_quizId: string,
) => {
  const quiz = await quizRepository.findQuizAnswerByExternalId(external_quizId);
  if (!quiz) {
    throw new HttpError(404, "لم يتم العثور على هذا الاختبار");
  }
  const giveUp = await giveUpRepository.findForUserAndQuiz(userId, quiz.id);
  return giveUp;
};

export const getUserQuizzesGiveUpsForLesson = async (
  userId: number,
  slug: string,
) => {
  const quizGiveUps = await quizRepository.findLessonGiveUps(userId, slug);
  return quizGiveUps;
};
