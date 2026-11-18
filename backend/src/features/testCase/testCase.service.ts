import { HttpError } from "../../shared/errors/HttpError.js";
import { quizRepository } from "../../shared/persistence/quiz.repository.js";
import { testCaseRepository } from "./testCase.repository.js";

export const getQuizTestCasesInputs = async (external_quizId: string) => {
  const quiz = await quizRepository.findQuizByExternalId(external_quizId);
  if (!quiz) {
    throw new HttpError(404, "لم يتم العثور على إجابة هذا الاختبار.");
  }

  return testCaseRepository.findInputsForQuiz(quiz.id);
};
