import { Box, Text } from "@radix-ui/themes";
import type { AxiosError } from "axios";
import type { ResponseError } from "@app/types";
import { ErrorElement } from "../ui/ErrorElement";

type SubmissionFeedbackProps = {
  runCodeError: AxiosError<ResponseError> | null;
  testCasesFetchError: AxiosError<ResponseError> | null;
  submissionError: AxiosError<ResponseError> | null;
  lastResult: { isCorrect: boolean } | null | undefined;
};

export function SubmissionFeedback({
  runCodeError,
  testCasesFetchError,
  submissionError,
  lastResult,
}: SubmissionFeedbackProps) {
  if (runCodeError) {
    return (
      <Box>
        <Text as="p" mb={"3"}>الكود فيه مشاكل</Text>
        <ErrorElement axiosError={runCodeError} />
      </Box>
    );
  }
  if (testCasesFetchError) {
    return (
      <Text as="p" className="text-red-500">
        خطأ في تحميل حالات الاختبار.
      </Text>
    );
  }

  if (submissionError) {
    return (
      <Text as="p" className="text-red-500">
        خطأ في إرسال الحل.
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
