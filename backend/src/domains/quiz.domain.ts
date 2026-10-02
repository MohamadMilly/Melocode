import {
  QuizGiveUp,
  QuizSubmission,
  TestCase,
  UserQuizOutput,
} from "@app/types";

export const hasCompletedAllQuizzes = (
  quizAnswers: {
    submissions: Pick<QuizSubmission, "id">[];
    giveUps: Pick<QuizGiveUp, "id">[];
  }[],
): boolean => {
  return quizAnswers.every(
    ({ submissions, giveUps }) => submissions.length > 0 || giveUps.length > 0,
  );
};

export const canRevealQuizAnswer = (quizAnswer: {
  submissions: QuizSubmission[];
  giveUps: QuizGiveUp[];
}): boolean =>
  quizAnswer.submissions.length > 0 || quizAnswer.giveUps.length > 0;

export const canGiveUp = (hasCorrectSubmission: boolean): boolean =>
  !hasCorrectSubmission;

export const canSubmitAfterGiveUp = (hasGivenUp: boolean): boolean =>
  !hasGivenUp;

export const hasTestCases = (testCases: TestCase[]): boolean =>
  testCases.length > 0;

export const isMultipleChoiceAlreadySubmitted = (
  submissions: QuizSubmission[],
): boolean => submissions.length > 0;

export const isSubmissionCorrect = ({
  type,
  content,
  testCases,
  userOutputs,
}: {
  type: "MULTIPLE_CHOICE" | "CODING";
  content: string;
  testCases: TestCase[];
  userOutputs: UserQuizOutput[];
}): boolean => {
  if (type === "MULTIPLE_CHOICE") {
    return content.trim() === testCases[0].output.trim();
  }

  return testCases.every((testCase) => {
    const userOutput = userOutputs.find(
      (output) => output.testCaseId === testCase.id,
    );
    return Boolean(
      userOutput?.output && userOutput.output.trim() === testCase.output.trim(),
    );
  });
};
