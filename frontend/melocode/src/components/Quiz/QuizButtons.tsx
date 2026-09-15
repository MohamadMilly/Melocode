import { Button, Flex } from "@radix-ui/themes";
import { GiveUpAlertDialog } from "./GiveUpAlertDialog";

type QuizButtonsProps = {
  expanded: boolean;
  isSolutionVisible: boolean;
  isSolutionLoading: boolean;
  isQuizCompleted: boolean;
  hasGivenUp: boolean;
  isMultipleChoice: boolean;
  hasSubmission: boolean;
  isTestCasesLoading: boolean;
  isCodeRunning: boolean;
  isAnswerBeingSubmitted: boolean;
  isSubmissionPending: boolean;
  isGivingUp: boolean;
  onToggleSolution: () => void;
  onSubmit: () => void;
  onGiveUp: () => void;
};

export function QuizButtons({
  expanded,
  isSolutionVisible,
  isSolutionLoading,
  isQuizCompleted,
  hasGivenUp,
  isMultipleChoice,
  hasSubmission,
  isTestCasesLoading,
  isCodeRunning,
  isAnswerBeingSubmitted,
  isSubmissionPending,
  isGivingUp,
  onToggleSolution,
  onSubmit,
  onGiveUp,
}: QuizButtonsProps) {
  const isSolutionButtonDisabled =
    isSolutionLoading || (!isQuizCompleted && !hasGivenUp);
  const isSubmitButtonDisabled =
    isTestCasesLoading ||
    isCodeRunning ||
    isAnswerBeingSubmitted ||
    isSubmissionPending ||
    hasGivenUp ||
    (isMultipleChoice && hasSubmission);

  const submitButtonLabel = isTestCasesLoading
    ? "جاري تحميل الاختبارات"
    : isCodeRunning
      ? "يتم تنفيذ الكود"
      : isAnswerBeingSubmitted || isSubmissionPending
        ? "جاري التحقق"
        : "تحقق من الحل";

  return (
    <Flex
      className="w-full"
      gap={"2"}
      mt={"4"}
      direction={expanded ? "column" : "row"}
    >
      <Button
        className="grow! rounded-xl"
        disabled={isSolutionButtonDisabled}
        onClick={onToggleSolution}
      >
        {isSolutionVisible ? "إخفاء الحل" : "إظهار الحل"}
      </Button>
      <Button
        className="grow! rounded-xl"
        onClick={onSubmit}
        disabled={isSubmitButtonDisabled}
      >
        {submitButtonLabel}
      </Button>
      <GiveUpAlertDialog
        onGiveUp={onGiveUp}
        isGivingUp={isGivingUp}
        disabled={isQuizCompleted}
      />
    </Flex>
  );
}