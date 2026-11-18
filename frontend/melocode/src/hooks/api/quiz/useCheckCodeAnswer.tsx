import { useMutation } from "@tanstack/react-query";
import { useQuizTestCase } from "./useQuizTestCases";
import { useRunCode } from "../online-compiler/useRunCode";
import { useSubmitQuizAnswer } from "./useSubmitQuizAnswer";
import type { QuizSubmission, ResponseError } from "@app/types";
import { AxiosError } from "axios";
import { extractFunctionsNames } from "../../../shared/utils/extractFunctionsNames";
import type { Language } from "../../../shared/types/languages.types";
import { templates } from "../../../code_templates";

export function useCheckCodeAnswer(
  quizId: string,
  slug: string,
  language: Language = "javascript",
) {
  const {
    refetch: fetchTestCases,
    isLoading: areTestCasesLoading,
    error: testCasesFetchError,
  } = useQuizTestCase(quizId);

  const {
    mutateAsync: run,
    isPending: isRunningPending,
    error: runCodeError,
  } = useRunCode();

  const {
    mutateAsync: submitAnswer,
    isPending: isAnswerBeingSubmitted,
    error: submissionError,
  } = useSubmitQuizAnswer();
  const checkAnswer = async ({ code }: { code: string }) => {
    if (!quizId) return;
    const response = await fetchTestCases();
    const testCases = response.data?.testCases;

    const functionNamesMatches = extractFunctionsNames(code, language);

    const functionToBeTestedName =
      functionNamesMatches[functionNamesMatches.length - 1];
    const currentCode = code;

    const codeToRunGenerator = templates[language];
    if (!codeToRunGenerator) {
      throw new Error(
        `Not available language , check the format : ${language}`,
      );
    }
    const codeToRun = codeToRunGenerator({
      currentCode,
      testCases,
      functionToBeTestedName,
    });
    const runCodeOutput = await run({ code: codeToRun, language: language });
    if (runCodeOutput.status === "success") {
      // there is no compile/execustion errors
      const userOutputs = JSON.parse(runCodeOutput.output);
      const { submission } = await submitAnswer({
        language: language,
        content: currentCode,
        userOutputs: userOutputs,
        quizId: quizId,
        slug: slug,
      });
      return submission;
    }
  };

  const {
    isPending,
    error,
    mutateAsync: triggerCheckAnswer,
  } = useMutation<
    QuizSubmission | null | undefined,
    AxiosError<ResponseError>,
    { code: string }
  >({
    mutationKey: ["check-answer"],
    mutationFn: checkAnswer,
  });

  return {
    checkAnswer: triggerCheckAnswer,
    isPending,
    error,
    submissionError,
    areTestCasesLoading,
    testCasesFetchError,
    isRunningPending,
    runCodeError,

    isAnswerBeingSubmitted,
  };
}
