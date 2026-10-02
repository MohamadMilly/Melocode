import { HttpError } from "../shared/errors/HttpError.js";
import { canGiveUp } from "../domains/quiz.domain.js";
import { submissionRepository } from "../repositories/submission.repository.js";
import { giveUpRepository } from "../repositories/giveup.repository.js";
import { quizRepository } from "../repositories/quiz.repository.js";

export const giveUpToQuiz = async (quizAnswerId: number, userId: number) => {
  try {
    const existingCorrectSubmission =
      await submissionRepository.findCorrectSubmissionForUser(
        userId,
        quizAnswerId,
      );
    if (!canGiveUp(Boolean(existingCorrectSubmission))) {
      throw new HttpError(400, "لا يمكن الاستسلام عن تمرين محلول مسبقا");
    }

    return await giveUpRepository.createGiveUp(userId, quizAnswerId);
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
  quizAnswerId: number,
) => {
  return giveUpRepository.findForUserAndQuiz(userId, quizAnswerId);
};

export const getUserQuizzesGiveUpsForLesson = async (
  userId: number,
  lessonId: number,
) => {
  return quizRepository.findLessonGiveUps(userId, lessonId);
};
