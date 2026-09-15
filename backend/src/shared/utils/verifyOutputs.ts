import { QuizTestCase, UserQuizOutput } from "@app/types";

export function verifyOutputs(
  testCases: QuizTestCase[],
  userOutputs: UserQuizOutput[],
) {
  return testCases.every((testCase) => {
    const userOutput = userOutputs.find(
      (userOutput) => userOutput.testCaseId === testCase.id,
    );
    if (!userOutput || !userOutput.output) {
      return false;
    }

    return userOutput.output.trim() === testCase.output.trim();
  });
}
