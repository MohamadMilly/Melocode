import { useMutation } from "@tanstack/react-query";
import { useQuizTestCase } from "../api/quiz/useQuizTestCases";
import { useRunCode } from "../api/online-compiler/useRunCode";
import { useSubmitQuizAnswer } from "../api/quiz/useSubmitQuizAnswer";

export function useCheckAnswer(quizAnswerId: number, lessonId: number) {
  const {
    refetch: fetchTestCases,
    isLoading: areTestCasesLoading,
    error: testCasesFetchError,
  } = useQuizTestCase(quizAnswerId);
  const {
    mutateAsync: run,
    isPending: isRunningPending,
    error: runCodeError,
  } = useRunCode();

  const { mutateAsync: submitAnswer, isPending: isAnswerBeingSubmitted } =
    useSubmitQuizAnswer();
  const checkAnswer = async ({ code }: { code: string }) => {
    if (!quizAnswerId) return;
    const response = await fetchTestCases();
    const testCases = response.data?.testCases;
    const regex =
      /(?:function\s+([a-zA-Z_$][\w$]*)|([a-zA-Z_$][\w$]*)\s*=\s*(?:\([^)]*\)\s*=>|function\s*\xlb))/g;

    const functionNamesMatches = [...code.matchAll(regex)].map(
      (match) => match[1] || match[2],
    );

    const functionToBeTestedName =
      functionNamesMatches[functionNamesMatches.length - 1];
    const currentCode = code;

    const codeToRun = `
    const originalLog = console.log;
     console.log = () => {}
    ${currentCode}
    
    
    const testCases = ${JSON.stringify(testCases)};
    const results = [];
    for(const testCase of testCases) {
    const args = testCase.input.split("_").map(arg => Number.isNaN(Number(arg)) ? arg : Number(arg));
    
    const output = ${functionToBeTestedName}(...args);
    
    results.push({
    testCaseId:testCase.id,
    output:output,
    })
    }
    
    originalLog(JSON.stringify(results));
    `;

    const runCodeOutput = await run(codeToRun);
    if (runCodeOutput.status === "success") {
      const userOutputs = JSON.parse(runCodeOutput.output);
      const { submission } = await submitAnswer({
        language: "javascript",
        content: currentCode,
        userOutputs: userOutputs,
        quizAnswerId: quizAnswerId,
        lessonId: lessonId,
      });
      return submission;
    } else {
      throw new Error("حدث خطأ اثناء تنفيذ الكود");
    }
  };

  const {
    isPending,
    error,
    mutateAsync: triggerCheckAnswer,
  } = useMutation({
    mutationKey: ["check-answer"],
    mutationFn: checkAnswer,
  });

  return {
    checkAnswer: triggerCheckAnswer,
    isPending,
    error,
    areTestCasesLoading,
    testCasesFetchError,
    isRunningPending,
    runCodeError,
    isAnswerBeingSubmitted,
  };
}
