import { Text } from "@radix-ui/themes";

type SubmissionFeedbackProps = {
  runCodeError: unknown;
  testCasesFetchError: unknown;
  submissionError: unknown;
  lastResult: { isCorrect: boolean } | null | undefined;
};

export function SubmissionFeedback({
  runCodeError,
  testCasesFetchError,
  submissionError,
  lastResult,
}: SubmissionFeedbackProps) {
  if (runCodeError || testCasesFetchError || submissionError) {
    return (
      <Text as="p" className="text-red-500">
        حدث خطأ اثناء تنفيذ الكود
      </Text>
    );
  }

  if (lastResult) {
    return (
      <Text
        as="p"
        className={`text-sm rounded p-1 ${
          lastResult.isCorrect ? "text-green-600" : "text-red-500"
        }`}
      >
        {lastResult.isCorrect ? "الحل صحيح" : "الحل خاطئ"}
      </Text>
    );
  }

  return null;
}
