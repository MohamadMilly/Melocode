import { Flex, Tabs, Text } from "@radix-ui/themes";
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
import type { QuizData } from "../../shared/types/Quiz.types";
import { useSubmitQuizAnswer } from "../../hooks/api/quiz/useSubmitQuizAnswer";
import { QuizAnswerProvider } from "../../providers/QuizAnswerProvider";
import { QuizButtons } from "./QuizButtons";

type QuizProps = {
  name: string;
  quiz: QuizData;
  submission: QuizSubmission | undefined | null;
  lessonId: number;
  giveUpData: QuizGiveUp | undefined;
  expanded?: boolean;
  goNext: () => void;
};

export function Quiz({
  name,
  quiz,
  submission,
  lessonId,
  giveUpData,
  expanded = false,
  goNext,
}: QuizProps) {
  const { user } = useAuth();
  const [isSolutionVisible, setIsSolutionVisible] = useState<boolean>(false);
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
    isPending: isSubmissionPending,
    error: submitError,
  } = useSubmitQuizAnswer();
  const {
    mutate: giveUp,
    isPending: isGivingUp,
    error: giveUpError,
  } = useGiveUpToQuiz();

  const [code, setCode] = useState(initialQuestionCode);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const hasCorrectSubmission = submission?.isCorrect ?? false;
  const hasGivenUp = !!giveUpData;
  const isQuizCompleted = hasCorrectSubmission || hasGivenUp;

  const [latestResult, setLatestResult] = useState<{
    isCorrect: boolean;
  } | null>(null);

  useEffect(() => {
    if (submission) {
      if (quiz.type === "MULTIPLE_CHOICE") {
        setSelectedOption(submission.content);
      } else {
        setCode(submission.content);
      }
    }
  }, [submission, quiz.type]);

  const {
    answer,
    isLoading: quizAnswerLoading,
    error: quizAnswerError,
  } = useQuizAnswer(quizAnswerId, isQuizCompleted);

  const handleToggleSolution = () => setIsSolutionVisible(!isSolutionVisible);

  const handleSubmit = async () => {
    let submissionResult: QuizSubmission | undefined | null;
    try {
      if (quiz.type === "MULTIPLE_CHOICE") {
        const { submission: createdSubmission } = await submit({
          userOutputs: [],
          type: "MULTIPLE_CHOICE",
          content: selectedOption,
          lessonId,
          quizAnswerId,
        });
        submissionResult = createdSubmission;
      } else {
        submissionResult = await checkAnswer({ code });
      }
      if (submissionResult) {
        setLatestResult({ isCorrect: submissionResult.isCorrect });
        if (submissionResult.isCorrect) {
          goNext();
        }
      }
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const handleGiveUp = () => {
    giveUp({ quizAnswerId, lessonId });
  };

  return (
    <Tabs.Content
      value={name}
      className={`rounded-2xl bg-[var(--gray-1)] p-1 ${expanded ? "grid grid-cols-[400px_1fr] gap-4 overflow-y-auto no-scrollbar p-4" : ""}`}
    >
      <Flex
        direction={"column"}
        align={"stretch"}
        gap={"3"}
        mb={"3"}
        className={`order-2 ${expanded ? "col-start-2 col-end-3" : ""}`}
      >
        {submission && !expanded && (
          <SubmissionStatusBanner hasCorrectSubmission={hasCorrectSubmission} />
        )}
        <Flex gap={"2"} wrap={"wrap"} align={"center"} justify={"end"}>
          <QuizTypeBadge badge={quiz.badge} />
          <QuizLevelBadge level={quiz.level} />
        </Flex>
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
              editorDisabled={hasGivenUp}
            />
          </QuizAnswerProvider>
        </div>
      </Flex>

      <Flex
        className={`order-1 ${expanded ? "col-start-1 col-end-2" : ""}`}
        direction={"column"}
        gap={"3"}
        align={"stretch"}
      >
        {submission && expanded && (
          <SubmissionStatusBanner hasCorrectSubmission={isQuizCompleted} />
        )}
        <SubmissionFeedback
          runCodeError={runCodeError}
          lastResult={latestResult}
          testCasesFetchError={testCasesFetchError}
          submissionError={submissionError ?? submitError}
        />
        {giveUpError && <ErrorElement axiosError={giveUpError} />}
        {hasGivenUp && (
          <Text className="rounded-lg border border-[var(--red-6)] bg-[var(--red-2)] px-3 py-2 text-sm text-[var(--red-11)]">
            تم الاستسلام عن هذا التمرين
          </Text>
        )}
        {user ? (
          <QuizButtons
            expanded={expanded}
            isSolutionVisible={isSolutionVisible}
            isSolutionLoading={quizAnswerLoading}
            isQuizCompleted={isQuizCompleted}
            hasGivenUp={hasGivenUp}
            isMultipleChoice={quiz.type === "MULTIPLE_CHOICE"}
            hasSubmission={!!submission}
            isTestCasesLoading={areTestCasesLoading}
            isCodeRunning={isRunningPending}
            isAnswerBeingSubmitted={isAnswerBeingSubmitted}
            isSubmissionPending={isSubmissionPending}
            isGivingUp={isGivingUp}
            onToggleSolution={handleToggleSolution}
            onSubmit={handleSubmit}
            onGiveUp={handleGiveUp}
          />
        ) : (
          <Text dir="auto">سجل الدخول أو أنشئ حساب لتتمكن من الإجابة.</Text>
        )}
        <QuizSolution
          answer={answer}
          isLoading={quizAnswerLoading}
          error={quizAnswerError}
          solutionVisible={isSolutionVisible}
        />
      </Flex>
    </Tabs.Content>
  );
}
