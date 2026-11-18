import type { QuizSubmissionType, UserQuizOutput } from "@app/types";
import { eventEmitter } from "../../infrastructure/lib/eventEmitter.js";
import { HttpError } from "../../shared/errors/HttpError.js";
import { quizRepository } from "../../shared/persistence/quiz.repository.js";
import { submissionRepository } from "./submission.repository.js";
import * as submissionDomain from "./submission.domain.js";

export const createSubmission = async ({
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
  const quiz = await quizRepository.findQuizByExternalId(external_quizId);
  if (!quiz) {
    throw new HttpError(404, "لم يتم العثور على إجابة هذا الاختبار.");
  }

  const quizAnswerId = quiz.id;
  const giveUpForThisQuiz = await submissionRepository.findGiveUpForUserAndQuiz(
    userId,
    quizAnswerId,
  );
  if (!submissionDomain.canSubmitAfterGiveUp(Boolean(giveUpForThisQuiz))) {
    throw new HttpError(
      400,
      "لقد استسلمت لهذا الاختبار. لا يمكنك إرسال حلول جديدة.",
    );
  }

  const testCases =
    await submissionRepository.findTestCasesForQuiz(quizAnswerId);
  if (!submissionDomain.hasTestCases(testCases)) {
    throw new HttpError(400, "هذا الاختبار لا يحتوي على حالات اختبار. ");
  }

  if (type === "MULTIPLE_CHOICE") {
    const existingSubmissions = await submissionRepository.findForUserAndQuiz(
      userId,
      quizAnswerId,
    );
    if (
      submissionDomain.isMultipleChoiceAlreadySubmitted(existingSubmissions)
    ) {
      throw new HttpError(400, "لقد أجبت عن هذا السؤال من قبل.");
    }
  }

  const isCorrect = submissionDomain.isSubmissionCorrect({
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
