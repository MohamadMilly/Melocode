import { Button, Flex, Tabs, Text } from "@radix-ui/themes";
import { QuizTypeBadge, type QuizBadgeType } from "./QuizTypeBadge";
import { useEffect, useState } from "react";
import { useQuizAnswer } from "../../hooks/api/quiz/useQuizAnswer";
import { QuizSolution } from "./QuizSolution";
import { useAuth } from "../../contexts/AuthContext";
import { useCheckAnswer } from "../../hooks/utils/useCheckAnswer";
import { QuizLevelBadge, type QuizLevelType } from "./QuizLevelBadge";
import { QuizQuestion } from "./QuizQuestion";
import type { QuizGiveUp, QuizSubmission } from "@app/types";
import { SubmissionStatusBanner } from "./SubmissionStatusBanner";
import { SubmissionFeedback } from "./QuizSubmissionFeedback";
import { useGiveUpToQuiz } from "../../hooks/api/me/useGiveUpToQuiz";
import { ErrorElement } from "../shared/ui/ErrorElement";
import { GiveUpAlertDialog } from "./GiveUpAlertDialog";

export type QuizQuestionItem = {
  type: "text" | "note" | "code" | "hint";
  content: string;
  language?: string;
};
export type QuizQuestion = {
  items: QuizQuestionItem[];
};
export type QuizData = {
  badge: QuizBadgeType;
  answerId: number;
  question: QuizQuestion;
  level: QuizLevelType;
};
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
  } = useCheckAnswer(quizAnswerId, lessonId);

  const {
    mutate: giveUp,
    isPending: isGivingUp,
    error: giveUpError,
  } = useGiveUpToQuiz();

  const [code, setCode] = useState(initialQuestionCode);
  const isCompleted = submission ? submission.isCorrect : false;
  const isGivenUp = !!giveUpData;
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
    if (submission) {
      setCode(submission.content);
    }
  }, [submission]);

  const {
    answer,
    isLoading: quizAnswerLoading,
    error: quizAnswerError,
  } = useQuizAnswer(quizAnswerId, isCompleted || isGivenUp);

  const toggleSolutionVisibility = () => setSolutionVisible(!solutionVisible);

  const handleSubmitCheck = async () => {
    try {
      const submissionResult = await checkAnswer({ code: code });

      if (submissionResult) {
        setLastResult({ isCorrect: submissionResult?.isCorrect });
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
      className={`${expanded ? "grid grid-cols-[400px_1fr] grid-rows-1 overflow-y-auto no-scrollbar" : ""}`}
    >
      <Flex
        direction={"column"}
        align={"end"}
        mb={"4"}
        p={"2"}
        className="col-start-2 col-end-3 row-start-1 row-end-2"
      >
        {submission && !expanded && (
          <SubmissionStatusBanner isCompleted={isCompleted} />
        )}
        <Flex gap={"2"}>
          <QuizTypeBadge badge={quiz.badge} />
          <QuizLevelBadge level={quiz.level} />
        </Flex>
        <QuizQuestion
          questionItems={questionItems}
          code={code}
          setCode={setCode}
          editorDisabled={isGivenUp}
        />
      </Flex>

      <Flex
        className={`col-start-1 col-end-2 row-start-1 row-end-2`}
        direction={"column"}
        gap={"2"}
        align={"end"}
        my={"2"}
      >
        {" "}
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
          <Text className="text-sm text-red-500">
            تم الاستسلام عن هذا التمرين
          </Text>
        )}
        {user && (
          <Flex
            className="w-full"
            gap={"2"}
            direction={expanded ? "column" : "row"}
          >
            <Button
              className="grow!"
              disabled={quizAnswerLoading || (!isCompleted && !isGivenUp)}
              onClick={toggleSolutionVisibility}
            >
              {solutionVisible ? "إخفاء الحل" : "إظهار الحل"}
            </Button>
            <Button
              className="grow!"
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
              disabled={isCompleted || isGivenUp}
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
