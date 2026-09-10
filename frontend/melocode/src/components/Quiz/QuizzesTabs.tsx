import { Box, Button, Tabs } from "@radix-ui/themes";
import { Quiz } from "./Quiz";
import { useMyLessonSubmissions } from "../../hooks/api/me/useLessonQuizzesSubmissions";
import { QuizSkeleton } from "./skeleton/QuizSkeleton";
import { useLessonQuizzesGiveUps } from "../../hooks/api/me/useLessonQuizzesGiveUps";
import { useCallback, useState } from "react";
import { Expand, Shrink } from "lucide-react";
import type { QuizData } from "../../shared/types/Quiz.types";

export function QuizesTabs({
  quizzes,
  lessonId,
}: {
  quizzes: QuizData[];
  lessonId: number;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const {
    submissionsData,
    isLoading: isLoadingSubmissions,
    error: submissionFetchError,
  } = useMyLessonSubmissions(lessonId);
  const {
    giveUpsData,
    isLoading: isLoadingGiveUps,
    error: giveUpFetchError,
  } = useLessonQuizzesGiveUps(lessonId);

  const quizzesCount = quizzes.length;
  const quizzesNames: string[] = [];

  for (let i = 1; i <= quizzesCount; i++) {
    quizzesNames.push(`التمرين-${i}`);
  }

  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);
  return (
    <Tabs.Root
      className={`bg-(--gray-2) rounded-md p-2 ${expanded ? "fixed inset-0 z-9999 flex h-dvh min-h-0 flex-col overflow-hidden rounded-none p-3 sm:p-4" : ""}`}
      defaultValue="التمرين-1"
    >
      <Tabs.List className={`${expanded ? "shrink-0" : ""}`}>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto no-scrollbar">
            {quizzesNames.map((name) => {
              return (
                <Tabs.Trigger
                  key={name}
                  disabled={isLoadingSubmissions}
                  className="shrink-0 capitalize"
                  value={name}
                >
                  {name.replace("-", " ")}
                </Tabs.Trigger>
              );
            })}
          </div>
          <Button
            className="shrink-0"
            aria-label={expanded ? "تصغير" : "توسيع"}
            variant="outline"
            onClick={toggleExpand}
          >
            {expanded ? <Shrink size={24} /> : <Expand size={24} />}
          </Button>
        </div>
      </Tabs.List>

      <Box
        className={expanded ? "min-h-0 min-w-0 flex-1 overflow-y-auto" : ""}
        pt="3"
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
              />
            );
          })
        )}
      </Box>
    </Tabs.Root>
  );
}
