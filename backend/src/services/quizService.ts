import type {
  QuizSubmission,
  QuizSubmissionType,
  UserQuizOutput,
} from "@app/types";
import { HttpError } from "../shared/errors/HttpError.js";
import { eventEmitter } from "../lib/eventEmitter.js";
import {
  canRevealQuizAnswer,
  canSubmitAfterGiveUp,
  hasTestCases,
  isMultipleChoiceAlreadySubmitted,
  isSubmissionCorrect,
} from "../domains/quiz.domain.js";
import { quizRepository } from "../repositories/quiz.repository.js";
import { submissionRepository } from "../repositories/submission.repository.js";
import { giveUpRepository } from "../repositories/giveup.repository.js";
import { testCaseRepository } from "../repositories/testCase.repository.js";

const findQuizByExternalId = async (external_quizId: string) => {
  const quiz = await quizRepository.findQuizAnswerByExternalId(external_quizId);
  console.log(quiz);
  if (!quiz) {
    throw new HttpError(404, "لم يتم العثور على إجابة هذا الاختبار.");
  }
  return quiz;
};

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

  if (!canRevealQuizAnswer(quizAnswer)) {
    throw new HttpError(
      400,
      "يمكنك فقط عرض الإجابة بعد الاستسلام أو الإجابة بشكل صحيح لمزيد من الشرح.",
    );
  }

  return quizAnswer;
};

export const saveSubmission = async ({
  content,
  language,
  external_quizId,
  userOutputs,
  userId,
  type,
}: {
  content: string;
  language: string | undefined | null;
  external_quizId: string;
  type: QuizSubmissionType;
  userOutputs: UserQuizOutput[];
  userId: number;
}) => {
  const quiz = await findQuizByExternalId(external_quizId);
  const quizAnswerId = quiz.id;
  const giveUpForThisQuiz = await giveUpRepository.findForUserAndQuiz(
    userId,
    quizAnswerId,
  );
  if (!canSubmitAfterGiveUp(Boolean(giveUpForThisQuiz))) {
    throw new HttpError(
      400,
      "لقد استسلمت لهذا الاختبار. لا يمكنك إرسال حلول جديدة.",
    );
  }

  const testCases = await testCaseRepository.findForQuiz(quizAnswerId);
  if (!hasTestCases(testCases)) {
    throw new HttpError(400, "هذا الاختبار لا يحتوي على حالات اختبار. ");
  }

  if (type === "MULTIPLE_CHOICE") {
    const existingSubmissions = await submissionRepository.findForUserAndQuiz(
      userId,
      quizAnswerId,
    );
    if (isMultipleChoiceAlreadySubmitted(existingSubmissions)) {
      throw new HttpError(400, "لقد أجبت عن هذا السؤال من قبل.");
    }
  }

  const isCorrect = isSubmissionCorrect({
    type,
    content,
    testCases,
    userOutputs,
  });
  const submission = await submissionRepository.upsertSubmission({
    content,
    language,
    userId,
    quizAnswerId,
    isCorrect,
  });

  if (submission.isCorrect) {
    eventEmitter.emit("submission-created", { userId });
  }
  return submission;
};

export const getQuizTestCasesInputs = async (external_quizId: string) => {
  const quiz = await findQuizByExternalId(external_quizId);
  return testCaseRepository.findInputsForQuiz(quiz.id);
};

export const getUserLessonSubmissions = async (
  userId: number,
  slug: string,
  isCorrect?: boolean,
) => {
  if (!userId || !slug) {
    throw new HttpError(400, "معلومات مطلوبة مفقودة (slug و userId)");
  }

  const lessonQuizzesSubmissions = await quizRepository.findLessonSubmissions(
    userId,
    slug,
    isCorrect,
  );

  return lessonQuizzesSubmissions;
};

export const getUserQuizSubmissions = async (
  external_quizId: string,
  userId: number,
) => {
  const quiz = await findQuizByExternalId(external_quizId);
  const submissions = await submissionRepository.findForUserAndQuiz(
    userId,
    quiz.id,
  );
  return submissions;
};
