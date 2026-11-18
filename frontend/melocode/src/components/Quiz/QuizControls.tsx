import { Button, Flex } from "@radix-ui/themes";
import type { QuizData } from "../../shared/types/Quiz.types";
import { ErrorElement } from "../ui/ErrorElement";
import { GiveUpAlertDialog } from "./GiveUpAlertDialog";
import { SubmissionFeedback } from "./QuizSubmissionFeedback";
import { useQuizControls } from "../../hooks/utils/useQuizControls";
import { getSubmitButtonLabel } from "../../shared/utils/getSubmitButtonLabel";

type QuizControlsProps = {
  quiz: QuizData;
  slug: string;
  hasGivenUp: boolean;
  isSolutionVisible: boolean;
  hasAnswer: boolean;

  onToggleSolution: () => void;
  goNext: () => void;
};

export function QuizControls({
  quiz,
  slug,
  hasGivenUp,
  isSolutionVisible,
  hasAnswer,
  onToggleSolution,
  goNext,
}: QuizControlsProps) {
  const {
    latestResult,
    isGivingUp,
    isSubmitDisabled,
    isQuizCompleted,
    statusFlags,
    errors,
    handleSubmit,
    handleGiveUp,
  } = useQuizControls({
    quiz,
    slug,
    hasGivenUp,

    goNext,
  });

  return (
    <>
      <SubmissionFeedback
        runCodeError={errors.runCode}
        lastResult={latestResult}
        testCasesFetchError={errors.testCasesFetch}
        submissionError={errors.submission}
      />

      {errors.giveUp && <ErrorElement axiosError={errors.giveUp} />}

      <Flex className="w-full" wrap="wrap" gap="2">
        <Button
          disabled={!isQuizCompleted}
          className="grow! rounded-xl"
          onClick={onToggleSolution}
        >
          {isSolutionVisible ? "إخفاء الحل" : "إظهار الحل"}
        </Button>

        <Button
          className="grow! rounded-xl"
          onClick={handleSubmit}
          disabled={isSubmitDisabled || !hasAnswer}
        >
          {getSubmitButtonLabel(statusFlags)}
        </Button>

        <GiveUpAlertDialog
          onGiveUp={handleGiveUp}
          isGivingUp={isGivingUp}
          disabled={isQuizCompleted}
        />
      </Flex>
    </>
  );
}
