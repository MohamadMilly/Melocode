import { useState } from "react";
import type { QuizSubmission } from "@app/types";
import { useQuizContext } from "../../contexts/QuizContext";
import { useGiveUpToQuiz } from "../api/me/useGiveUpToQuiz";
import { useCheckCodeAnswer } from "../api/quiz/useCheckCodeAnswer";
import { useSubmitQuizAnswer } from "../api/quiz/useSubmitQuizAnswer";
import { QUIZ_TYPES } from "../../shared/constants/quiz.type";
import type { QuizData } from "../../shared/types/Quiz.types";

type UseQuizControlsParams = {
  quiz: QuizData;
  slug: string;
  hasGivenUp: boolean;

  goNext: () => void;
};

export function useQuizControls({
  quiz,
  slug,
  hasGivenUp,

  goNext,
}: UseQuizControlsParams) {
  const { userAnswer, submission } = useQuizContext();
  const [latestResult, setLatestResult] = useState<{
    isCorrect: boolean;
  } | null>(null);

  const { quizId } = quiz;
  const isMultipleChoice = quiz.type === QUIZ_TYPES.MULTIPLE_CHOICE;
  const codeLanguage = quiz.question.items.find(
    (item) => item.type === "code",
  )?.language;

  const codeCheck = useCheckCodeAnswer(quizId, slug, codeLanguage);
  const mcSubmit = useSubmitQuizAnswer();
  const giveUpMutation = useGiveUpToQuiz();

  const hasCorrectSubmission = submission?.isCorrect ?? false;
  const isQuizCompleted = hasCorrectSubmission || hasGivenUp;

  const isSubmitting = codeCheck.isAnswerBeingSubmitted || mcSubmit.isPending;
  const isBusy =
    codeCheck.areTestCasesLoading || codeCheck.isRunningPending || isSubmitting;

  const isSubmitDisabled =
    isBusy || hasGivenUp || (isMultipleChoice && Boolean(submission));

  const handleSubmit = async () => {
    try {
      let result: QuizSubmission | undefined | null;

      if (isMultipleChoice) {
        const response = await mcSubmit.mutateAsync({
          userOutputs: [],
          type: QUIZ_TYPES.MULTIPLE_CHOICE,
          content: userAnswer,
          slug,
          quizId,
        });
        result = response.submission;
      } else {
        result = await codeCheck.checkAnswer({ code: userAnswer });
      }

      if (result) {
        setLatestResult({ isCorrect: result.isCorrect });
        if (result.isCorrect) {
          goNext();
        }
      }
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const handleGiveUp = () => {
    giveUpMutation.mutate({ quizId, slug });
  };

  return {
    latestResult,
    isQuizCompleted,
    isGivingUp: giveUpMutation.isPending,
    isSubmitDisabled,
    statusFlags: {
      areTestCasesLoading: codeCheck.areTestCasesLoading,
      isRunningPending: codeCheck.isRunningPending,
      isSubmitting,
    },
    errors: {
      runCode: codeCheck.runCodeError,
      testCasesFetch: codeCheck.testCasesFetchError,
      submission: codeCheck.submissionError ?? mcSubmit.error,
      giveUp: giveUpMutation.error,
    },
    userOutputs:codeCheck.,
    handleSubmit,
    handleGiveUp,
  };
}
