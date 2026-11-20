import { Flex, Tabs, Text } from "@radix-ui/themes";
import { QuizTypeBadge } from "./QuizTypeBadge";
import { useCallback, useEffect, useState } from "react";
import { QuizSolution } from "./QuizSolution";
import { useAuth } from "../../contexts/AuthContext";
import { QUIZ_TYPES } from "../../shared/constants/quiz.type";
import { QuizLevelBadge } from "./QuizLevelBadge";
import { QuizQuestion } from "./QuizQuestion";
import type { QuizGiveUp, QuizSubmission } from "@app/types";
import { SubmissionStatusBanner } from "./SubmissionStatusBanner";
import type { QuizData } from "../../shared/types/Quiz.types";
import { QuizProvider } from "../../providers/QuizProvider";
import { QuizControls } from "./QuizControls";
import { useMathJax } from "../../hooks/utils/useMathJax";
import { MathJax } from "better-react-mathjax";

type QuizProps = {
  name: string;
  quiz: QuizData;
  submission: QuizSubmission | null;
  slug: string;
  giveUpData: QuizGiveUp | undefined;
  expanded?: boolean;
  goNext: () => void;
};

export function Quiz({
  name,
  quiz,
  submission,
  slug,
  giveUpData,
  expanded = false,
  goNext,
}: QuizProps) {
  const { user } = useAuth();
  const [isSolutionVisible, setIsSolutionVisible] = useState<boolean>(false);
  const quizId = quiz.quizId;
  const questionItems = quiz.question.items;
  const codeItem = questionItems.find((item) => item.type === "code");
  const initialStarterCode = codeItem ? codeItem.content : "";

  const [userAnswer, setUserAnswer] = useState<string>(
    quiz.type === QUIZ_TYPES.CODE ? initialStarterCode : "",
  );

  const hasCorrectSubmission = submission?.isCorrect ?? false;
  const hasGivenUp = !!giveUpData;
  const isQuizCompleted = hasCorrectSubmission || hasGivenUp;

  useEffect(() => {
    if (submission) {
      setUserAnswer(submission.content);
    }
  }, [submission]);

  const handleToggleSolution = () => setIsSolutionVisible(!isSolutionVisible);

  const handleAnswerChange = useCallback((newAnswer: string): void => {
    setUserAnswer(newAnswer);
  }, []);

  return (
    <MathJax dynamic>
      <QuizProvider
        handleAnswerChange={handleAnswerChange}
        userAnswer={userAnswer}
        submission={submission}
      >
        <Tabs.Content
          value={name}
          className={`rounded-2xl data-[state=active]:animate-slideRight bg-[var(--gray-1)] p-1 ${expanded ? "grid grid-cols-[400px_1fr] gap-4 overflow-y-auto no-scrollbar p-4" : ""}`}
        >
          <Flex
            direction={"column"}
            align={"stretch"}
            gap={"3"}
            mb={"3"}
            className={`order-2 ${expanded ? "col-start-2 col-end-3" : ""}`}
          >
            {submission && !expanded && (
              <SubmissionStatusBanner
                hasCorrectSubmission={hasCorrectSubmission}
              />
            )}
            <Flex gap={"2"} wrap={"wrap"} align={"center"} justify={"end"}>
              <QuizTypeBadge badge={quiz.badge} />
              <QuizLevelBadge level={quiz.level} />
            </Flex>
            <div className="rounded-xl border border-[var(--gray-6)] bg-[var(--gray-2)] p-3">
              <QuizQuestion
                questionItems={questionItems}
                editorDisabled={hasGivenUp}
              />
            </div>
          </Flex>

          <Flex
            className={`order-1 ${expanded ? "col-start-1 col-end-2" : ""}`}
            direction={"column"}
            gap={"3"}
            align={"stretch"}
          >
            {submission && expanded && (
              <SubmissionStatusBanner
                hasCorrectSubmission={hasCorrectSubmission}
              />
            )}
            {hasGivenUp && (
              <Text className="rounded-lg border border-[var(--red-6)] bg-[var(--red-2)] px-3 py-2 text-sm text-[var(--red-11)]">
                تم الاستسلام عن هذا التمرين
              </Text>
            )}
            {user ? (
              <QuizControls
                hasAnswer={!!userAnswer}
                quiz={quiz}
                slug={slug}
                hasGivenUp={hasGivenUp}
                isSolutionVisible={isSolutionVisible}
                onToggleSolution={handleToggleSolution}
                goNext={goNext}
              />
            ) : (
              <Text dir="auto">سجل الدخول أو أنشئ حساب لتتمكن من الإجابة.</Text>
            )}
            {isSolutionVisible && <QuizSolution quizId={quizId} />}
          </Flex>
        </Tabs.Content>
      </QuizProvider>
    </MathJax>
  );
}
