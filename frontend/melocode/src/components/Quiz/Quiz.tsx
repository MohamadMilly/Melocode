import { Button, Flex, Tabs, Text } from "@radix-ui/themes";
import { QuizTypeBadge } from "./QuizTypeBadge";
import { useEffect, useState } from "react";
import { useQuizAnswer } from "../../hooks/api/quiz/useQuizAnswer";
import { QuizSolution } from "./QuizSolution";
import { useAuth } from "../../contexts/AuthContext";
import { useCheckCodeAnswer } from "../../hooks/utils/useCheckCodeAnswer";
import { QuizLevelBadge } from "./QuizLevelBadge";
import { QuizQuestion } from "./QuizQuestion";
import type { QuizGiveUp, QuizSubmission } from "@app/types";
import { SubmissionStatusBanner } from "./SubmissionStatusBanner";
import { SubmissionFeedback } from "./QuizSubmissionFeedback";
import { useGiveUpToQuiz } from "../../hooks/api/me/useGiveUpToQuiz";
import { ErrorElement } from "../shared/ui/ErrorElement";
import { GiveUpAlertDialog } from "./GiveUpAlertDialog";
import type { QuizData } from "../../shared/types/Quiz.types";
import { useSubmitQuizAnswer } from "../../hooks/api/quiz/useSubmitQuizAnswer";
import { QuizAnswerProvider } from "../../providers/QuizAnswerProvider";

type QuizProps = {
  name: string;
  quiz: QuizData;
  submission: QuizSubmission | undefined | null;
  lessonId: number;
  giveUpData: QuizGiveUp | undefined;
  expanded?: boolean;
};

export function Quiz({
  name,
  quiz,
  submission,
  lessonId,
  giveUpData,
  expanded = false,
}: QuizProps) {
  const { user } = useAuth();
  const [solutionVisible, setSolutionVisible] = useState<boolean>(false);
  const quizAnswerId = quiz.answerId;
  const questionItems = quiz.question.items;
  const codeItem = questionItems.find((item) => item.type === "code");
  const initialQuestionCode = codeItem ? codeItem.content : "";
  const {
    checkAnswer,
    isAnswerBeingSubmitted,
    isRunningPending,
    areTestCasesLoading,
    testCasesFetchError,
    submissionError,
    runCodeError,
  } = useCheckCodeAnswer(quizAnswerId, lessonId);

  const {
    mutateAsync: submit,
    isPending: isSubmitting,
    error: submitError,
  } = useSubmitQuizAnswer();
  const {
    mutate: giveUp,
    isPending: isGivingUp,
    error: giveUpError,
  } = useGiveUpToQuiz();

  const [code, setCode] = useState(initialQuestionCode);
  const [selectedOption, setSelectedOption] = useState<string>("");
<<<<<<< HEAD
  const isCorrect = submission ? submission.isCorrect : false;
=======
  const isCompleted = submission ? submission.isCorrect : false;
>>>>>>> landingPage
  const isGivenUp = !!giveUpData;
  const isCompleted = isCorrect || isGivenUp;

  const [lastResult, setLastResult] = useState<{ isCorrect: boolean } | null>(
    null,
  );

  useEffect(() => {
    if (expanded) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [expanded]);

  useEffect(() => {
    function setSubmissionCode() {
      if (submission) {
<<<<<<< HEAD
        if (quiz.badge === "Multiple Choice") {
=======
        if (quiz.type === "MULTIPLE_CHOICE") {
>>>>>>> landingPage
          setSelectedOption(submission.content);
        } else {
          setCode(submission.content);
        }
      }
    }
    setSubmissionCode();
<<<<<<< HEAD
  }, [submission, quiz.badge]);
=======
  }, [submission, quiz.type]);
>>>>>>> landingPage

  const {
    answer,
    isLoading: quizAnswerLoading,
    error: quizAnswerError,
  } = useQuizAnswer(quizAnswerId, isCompleted);

  const toggleSolutionVisibility = () => setSolutionVisible(!solutionVisible);

  const handleSubmitCheck = async () => {
    let submissionResult: QuizSubmission | undefined;
    try {
      if (quiz.type === "MULTIPLE_CHOICE") {
        const { submission } = await submit({
          userOutputs: [],
          type: "MULTIPLE_CHOICE",
          content: selectedOption,
          lessonId: lessonId,
          quizAnswerId: quiz.answerId,
        });
        submissionResult = submission;
      } else {
        submissionResult = await checkAnswer({ code: code });
      }
      if (submissionResult) {
        setLastResult({ isCorrect: submissionResult.isCorrect });
      }
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const handleGiveUp = () => {
    giveUp({ quizAnswerId: quizAnswerId, lessonId: lessonId });
  };

  return (
    <Tabs.Content
      value={name}
<<<<<<< HEAD
      className={`${expanded ? "grid min-w-0 grid-cols-1 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:grid-rows-1" : ""}`}
    >
      <Flex
        direction={"column"}
        align={"end"}
        mb={"4"}
        p={"2"}
        className="min-w-0 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2"
=======
      className={`rounded-2xl bg-[var(--gray-1)] p-1 ${expanded ? "grid grid-cols-[400px_1fr] gap-4 overflow-y-auto no-scrollbar p-4" : ""}`}
    >
      <Flex
        direction={"column"}
        align={"stretch"}
        gap={"3"}
        className={`order-2 ${expanded ? "col-start-2 col-end-3" : ""}`}
>>>>>>> landingPage
      >
        {submission && !expanded && (
          <SubmissionStatusBanner isCompleted={isCompleted} />
        )}
        <Flex gap={"2"} wrap={"wrap"} align={"center"} justify={"end"}>
          <QuizTypeBadge badge={quiz.badge} />
          <QuizLevelBadge level={quiz.level} />
        </Flex>
<<<<<<< HEAD
        <QuizAnswerProvider
          code={code}
          setCode={setCode}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        >
          <QuizQuestion
            questionItems={questionItems}
            editorDisabled={isGivenUp}
          />
        </QuizAnswerProvider>
      </Flex>

      <Flex
        className={`min-w-0 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2`}
=======
        <div className="rounded-xl border border-[var(--gray-6)] bg-[var(--gray-2)] p-3">
          <QuizAnswerProvider
            code={code}
            setCode={setCode}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            submission={submission}
          >
            <QuizQuestion
              questionItems={questionItems}
              editorDisabled={isGivenUp}
            />
          </QuizAnswerProvider>
        </div>
      </Flex>

      <Flex
        className={`order-1 ${expanded ? "col-start-1 col-end-2" : ""}`}
>>>>>>> landingPage
        direction={"column"}
        gap={"3"}
        align={"stretch"}
      >
        {submission && expanded && (
          <SubmissionStatusBanner isCompleted={isCompleted} />
        )}
        <SubmissionFeedback
          runCodeError={runCodeError}
          lastResult={lastResult}
          testCasesFetchError={testCasesFetchError}
          submissionError={submissionError}
        />
        {giveUpError && <ErrorElement axiosError={giveUpError} />}
        {isGivenUp && (
          <Text className="rounded-lg border border-[var(--red-6)] bg-[var(--red-2)] px-3 py-2 text-sm text-[var(--red-11)]">
            تم الاستسلام عن هذا التمرين
          </Text>
        )}
        {user && (
          <Flex
            className="w-full"
            gap={"2"}
            mt={"4"}
            direction={expanded ? "column" : "row"}
          >
            <Button
<<<<<<< HEAD
              className="grow!"
              disabled={quizAnswerLoading || !isCompleted}
=======
              className="grow! rounded-xl"
              disabled={quizAnswerLoading || (!isCompleted && !isGivenUp)}
>>>>>>> landingPage
              onClick={toggleSolutionVisibility}
            >
              {solutionVisible ? "إخفاء الحل" : "إظهار الحل"}
            </Button>
            <Button
              className="grow! rounded-xl"
              onClick={handleSubmitCheck}
              disabled={
                areTestCasesLoading ||
                isRunningPending ||
                isAnswerBeingSubmitted ||
                isGivenUp
              }
            >
              {areTestCasesLoading
                ? "جاري تحميل الاختبارات"
                : isRunningPending
                  ? "يتم تنفيذ الكود"
                  : isAnswerBeingSubmitted
                    ? "جاري التحقق"
                    : "تحقق من الحل"}
            </Button>
            <GiveUpAlertDialog
              onGiveUp={handleGiveUp}
              isGivingUp={isGivingUp}
              disabled={isCompleted}
            />
          </Flex>
        )}
        <QuizSolution
          answer={answer}
          isLoading={quizAnswerLoading}
          error={quizAnswerError}
          solutionVisible={solutionVisible}
        />
      </Flex>
    </Tabs.Content>
  );
}
