import { HttpError } from "../../shared/errors/HttpError.js";
import { quizRepository } from "../../shared/persistence/quiz.repository.js";
import { giveUpRepository } from "./giveUp.repository.js";

export const giveUpToQuiz = async (
  external_quizId: string,
  userId: number,
) => {
  try {
    const quiz = await quizRepository.findQuizByExternalId(external_quizId);
    if (!quiz) {
      throw new HttpError(404, "لم يتم العثور على هذا الاختبار");
    }

    const existingCorrectSubmission =
      await giveUpRepository.findCorrectSubmissionForUser(userId, quiz.id);
    if (existingCorrectSubmission) {
      throw new HttpError(400, "لا يمكن الاستسلام عن تمرين محلول مسبقا");
    }

    return await giveUpRepository.createGiveUp(userId, quiz.id);
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new HttpError(400, "You have already given up to this lesson");
    }
    if (err.code === "P2003") {
      throw new HttpError(
        500,
        `Foreign key constraint error: ${err.meta?.field_name ?? "Unknown"} does not exist`,
      );
    }
    throw err;
  }
};
