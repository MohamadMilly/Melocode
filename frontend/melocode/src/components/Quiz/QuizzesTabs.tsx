import { Box, Tabs } from "@radix-ui/themes";
import { Quiz, type QuizData } from "./Quiz";
import { useMyLessonSubmissions } from "../../hooks/api/me/useLessonQuizzesSubmissions";

export function QuizesTabs({
  quizzes,
  lessonId,
}: {
  quizzes: QuizData[];
  lessonId: number;
}) {
  const { submissionsData, isLoading, error } =
    useMyLessonSubmissions(lessonId);
 
  const quizzesCount = quizzes.length;
  const quizzesNames: string[] = [];
  for (let i = 1; i <= quizzesCount; i++) {
    quizzesNames.push(`التمرين-${i}`);
  }
  return (
    <Tabs.Root
      className="bg-[var(--gray-2)] p-2 rounded-md"
      defaultValue="التمرين-1"
    >
      <Tabs.List>
        {quizzesNames.map((name) => {
          return (
            <Tabs.Trigger className="capitalize" value={name}>
              {name.replace("-", " ")}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      <Box pt="3">
        {quizzes.map((quiz, index) => {
          let submission = null;
          const thisQuizSubmissionsData = submissionsData.find(
            (submissionData) => submissionData.id === quiz.answerId,
          );
          if (thisQuizSubmissionsData) {
            const correctSubmission = thisQuizSubmissionsData?.submissions.find(
              (s) => s.isCorrect,
            );
            const wrongSubmission = thisQuizSubmissionsData?.submissions.find(
              (s) => !s.isCorrect,
            );
            submission = correctSubmission ?? wrongSubmission;
          }
          return (
            <Quiz
              name={quizzesNames[index]}
              quiz={quiz}
              submission={submission}
              lessonId={lessonId}
            />
          );
        })}
      </Box>
    </Tabs.Root>
  );
}
