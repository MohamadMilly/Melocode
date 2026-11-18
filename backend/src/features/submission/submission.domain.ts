import type {
  QuizSubmission,
  QuizSubmissionType,
  TestCase,
  UserQuizOutput,
} from "@app/types";

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
  type: QuizSubmissionType;
  content: string;
  testCases: TestCase[];
  userOutputs: UserQuizOutput[];
}): boolean => {
  if (type === "MULTIPLE_CHOICE") {
    return content.trim() === testCases[0].output.trim();
  }

  return testCases.every((testCase) => {
    const userOutput = userOutputs.find(
      (output) => Number(output.testCaseId) === testCase.id,
    );
    return Boolean(
      userOutput?.output &&
      userOutput.output?.toString().trim() === testCase.output.trim(),
    );
  });
};
