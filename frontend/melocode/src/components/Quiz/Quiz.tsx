import { Button, Flex, Tabs, Text } from "@radix-ui/themes";
import { QuizTypeBadge, type QuizBadgeType } from "./QuizTypeBadge";
import { useEffect, useMemo, useState } from "react";
import { useQuizAnswer } from "../../hooks/api/quiz/useQuizAnswer";
import { QuizSolution } from "./QuizSolution";
import { useAuth } from "../../contexts/AuthContext";
import { useMyQuizSubmissions } from "../../hooks/api/me/useMyQuizSubmission";
import { useCheckAnswer } from "../../hooks/utils/useCheckAnswer";
import { SuccessCheckMark } from "../shared/ui/SuccessCheckMark";
import { SuccessConfetti } from "../shared/ui/SuccessConfetti";
import { QuizLevelBadge, type QuizLevelType } from "./QuizLevelBadge";
import { QuizQuestion } from "./QuizQuestion";
import type { QuizSubmission } from "@app/types";
import { SubmissionStatusBanner } from "./SubmissionStatusBanner";

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
};

export function Quiz({ name, quiz, submission, lessonId }: QuizProps) {
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
  } = useCheckAnswer(quizAnswerId, lessonId);

  const [code, setCode] = useState(initialQuestionCode);
  const isCompleted = submission ? submission.isCorrect : false;

  useEffect(() => {
    if (submission) {
      setCode(submission.content);
    }
  }, [submission]);

  const {
    answer,
    isLoading: quizAnswerLoading,
    error: quizAnswerError,
  } = useQuizAnswer(quizAnswerId, isCompleted);

  const toggleSolutionVisibility = () => setSolutionVisible(!solutionVisible);

  const handleSubmitCheck = async () => {
    try {
      const submissionResult = await checkAnswer({ code: code });
      console.log("Success!", submissionResult);
    } catch (err) {
      console.error("Submission failed", err);
    }
  };
  return (
    <Tabs.Content value={name}>
      <Flex direction={"column"} align={"end"} mb={"4"} p={"2"}>
        {submission && <SubmissionStatusBanner isCompleted={isCompleted} />}
        <Flex gap={"2"}>
          <QuizTypeBadge badge={quiz.badge} />
          <QuizLevelBadge level={quiz.level} />
        </Flex>
        <QuizQuestion
          questionItems={questionItems}
          code={code}
          setCode={setCode}
        />
      </Flex>
      <Flex direction={"column"} gap={"2"} align={"end"}>
        {user && (
          <Flex gap={"2"}>
            <Button
              disabled={quizAnswerLoading || !answer}
              onClick={toggleSolutionVisibility}
            >
              {solutionVisible ? "إخفاء الحل" : "إظهار الحل"}
            </Button>
            <Button
              onClick={handleSubmitCheck}
              disabled={
                areTestCasesLoading ||
                isRunningPending ||
                isAnswerBeingSubmitted
              }
            >
              تحقق من الحل
            </Button>
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
