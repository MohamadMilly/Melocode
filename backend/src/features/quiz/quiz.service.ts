import { HttpError } from "../../shared/errors/HttpError.js";
import { quizRepository } from "../../shared/persistence/quiz.repository.js";
import * as quizDomain from "./quiz.domain.js";

export const getQuizAnswer = async ({
  external_quizId,
  userId,
}: {
  external_quizId: string;
  userId: number;
}) => {
  const quizAnswer = await quizRepository.findQuizAnswerWithUserState(
    external_quizId,
    userId,
  );

  if (!quizAnswer) {
    throw new HttpError(404, "لم يتم العثور على إجابة هذا الاختبار.");
  }

  if (!quizDomain.canRevealQuizAnswer(quizAnswer)) {
    throw new HttpError(
      400,
      "يمكنك فقط عرض الإجابة بعد الاستسلام أو الإجابة بشكل صحيح لمزيد من الشرح.",
    );
  }

  return quizAnswer;
};
