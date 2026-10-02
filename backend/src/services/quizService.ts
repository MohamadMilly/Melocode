import { UserQuizOutput } from "@app/types";
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

export const getQuizAnswer = async ({
  answerId,
  userId,
}: {
  answerId: number;
  userId: number;
}) => {
  const quizAnswer = await quizRepository.findQuizAnswerWithUserState(
    answerId,
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
  quizAnswerId,
  userOutputs,
  userId,
  type,
}: {
  content: string;
  language: string | undefined | null;
  quizAnswerId: number;
  type: "MULTIPLE_CHOICE" | "CODING";
  userOutputs: UserQuizOutput[];
  userId: number;
}) => {
  // validation
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
  // verification
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
  // creation
  const submission = await submissionRepository.upsertSubmission({
    content,
    language,
    userId,
    quizAnswerId,
    isCorrect,
  });
  // emitation
  if (submission.isCorrect) {
    eventEmitter.emit("submission-created", { userId: userId });
  }
  return submission;
};

export const getQuizTestCasesInputs = async (quizAnswerId: number) => {
  return testCaseRepository.findInputsForQuiz(quizAnswerId);
};

export const getUserLessonSubmissions = async (
  userId: number,
  lessonId: number,
  isCorrect?: boolean,
) => {
  if (!userId || !lessonId) {
    throw new HttpError(400, "معلومات مطلوبة مفقودة (lessonId و userId)");
  }
  return quizRepository.findLessonSubmissions(userId, lessonId, isCorrect);
};

export const getUserQuizSubmissions = async (
  quizAnswerId: number,
  userId: number,
) => {
  return submissionRepository.findForUserAndQuiz(userId, quizAnswerId);
};
