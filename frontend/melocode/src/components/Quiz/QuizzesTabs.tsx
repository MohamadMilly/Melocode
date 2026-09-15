import { Box, Button, Tabs } from "@radix-ui/themes";
import { Quiz } from "./Quiz";
import { useMyLessonSubmissions } from "../../hooks/api/me/useLessonQuizzesSubmissions";
import { QuizSkeleton } from "./skeleton/QuizSkeleton";
import { useLessonQuizzesGiveUps } from "../../hooks/api/me/useLessonQuizzesGiveUps";
import { useCallback, useState } from "react";
import { Expand, Shrink } from "lucide-react";
import type { QuizData } from "../../shared/types/Quiz.types";

export function QuizzesTabs({
  quizzes,
  lessonId,
}: {
  quizzes: QuizData[];
  lessonId: number;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { submissionsData, isLoading: isLoadingSubmissions } =
    useMyLessonSubmissions(lessonId);
  const [currentQuiz, setCurrentQuiz] = useState<string>("التمرين-1");
  const { giveUpsData } = useLessonQuizzesGiveUps(lessonId);

  const quizzesCount = quizzes.length;
  const quizzesNames: string[] = [];

  for (let i = 1; i <= quizzesCount; i++) {
    quizzesNames.push(`التمرين-${i}`);
  }

  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const goNext = () => {
    const nextQuiz = `التمرين-${Number(currentQuiz.split("-")[1]) + 1}`;
    if (quizzesNames.includes(nextQuiz)) {
      setCurrentQuiz(nextQuiz);
    }
  };
  const onValueChange = (value: string) => setCurrentQuiz(value);
  return (
    <Tabs.Root
      className={`overflow-hidden rounded-2xl border border-[var(--gray-6)] bg-[var(--gray-1)] shadow-sm ${expanded ? "fixed inset-0 z-9999 flex h-screen flex-col rounded-none border-0 shadow-none" : ""}`}
      value={currentQuiz}
      onValueChange={onValueChange}
    >
      <Tabs.List
        className={`bg-[var(--gray-2)] px-3 py-1 md:py-2 ${expanded ? "shrink-0" : ""}`}
      >
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
            {quizzesNames.map((name) => {
              return (
                <Tabs.Trigger
                  key={name}
                  disabled={isLoadingSubmissions}
                  className="rounded-xl border border-transparent px-3 py-2 text-sm font-medium capitalize text-[var(--gray-11)] transition-all data-[state=active]:border-[var(--accent-6)] data-[state=active]:bg-[var(--accent-3)] data-[state=active]:text-[var(--accent-11)] data-[state=active]:shadow-sm"
                  value={name}
                >
                  {name.replace("-", " ")}
                </Tabs.Trigger>
              );
            })}
          </div>
          <Button
            className="shrink-0 rounded-xl hidden! md:block!"
            aria-label={expanded ? "تصغير" : "توسيع"}
            variant="outline"
            color="gray"
            onClick={toggleExpand}
          >
            {expanded ? <Shrink size={20} /> : <Expand size={20} />}
          </Button>
        </div>
      </Tabs.List>

      <Box
        className={
          expanded
            ? "min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-4"
            : "px-1 md:px-3 pb-3 pt-4"
        }
      >
        {isLoadingSubmissions ? (
          <QuizSkeleton name="التمرين-1" />
        ) : (
          quizzes.map((quiz, index) => {
            let submission = null;

            const thisQuizSubmissionsData = submissionsData.find(
              (submissionData) => submissionData.id === quiz.answerId,
            );
            const thisQuizGiveUpData = giveUpsData.find(
              (gData) => gData.id === quiz.answerId,
            );
            const giveUp = thisQuizGiveUpData?.giveUps[0];
            if (thisQuizSubmissionsData) {
              const correctSubmission =
                thisQuizSubmissionsData?.submissions.find((s) => s.isCorrect);
              const wrongSubmission = thisQuizSubmissionsData?.submissions.find(
                (s) => !s.isCorrect,
              );
              submission = correctSubmission ?? wrongSubmission;
            }
            return (
              <Quiz
                expanded={expanded}
                name={quizzesNames[index]}
                quiz={quiz}
                submission={submission}
                giveUpData={giveUp}
                lessonId={lessonId}
                goNext={goNext}
              />
            );
          })
        )}
      </Box>
    </Tabs.Root>
  );
}
