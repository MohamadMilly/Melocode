import { useParams } from "react-router";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";

import { MDXProvider } from "@mdx-js/react";
import { markDownComponents } from "../../components/Lesson/MarkDownComponents";
import { lessons } from "../../lessons/lessons";
import { QuizesTabs } from "../../components/Quiz/QuizzesTabs";
import { Brain } from "lucide-react";
import { LessonContents } from "../../components/Lesson/LessonContents";
import { useMyLessonProgress } from "../../hooks/api/me/useMyLessonProgress";
import { useCompleteLesson } from "../../hooks/api/me/useCompleteLesson";
import { useAuth } from "../../contexts/AuthContext";
import { EmptyLessonState } from "../../components/Lesson/EmptyLessonState";

export function LessonPage() {
  const { slug } = useParams();
  const { mutate: completeLesson, isPending: isCompleting } =
    useCompleteLesson();
  const { user } = useAuth();

  const lesson = lessons[slug as string];

  const {
    progress,
    hasCompletedAllQuizzes,
    isLoading: isProgressLoading,
  } = useMyLessonProgress(lesson ? lesson.frontmatter.lessonId : undefined);

  if (!lesson) {
    return <EmptyLessonState />;
  }

  const { Article, toc, exercises, frontmatter } = lesson;
  const lessonId = frontmatter.lessonId;

  const isLessonCompleted = !!progress?.completedAt;
  const isCompleteButtonDisabled =
    isProgressLoading ||
    isCompleting ||
    !hasCompletedAllQuizzes ||
    isLessonCompleted;

  const handleCompleteLesson = () => {
    if (!user) return;
    completeLesson(lessonId);
  };

  return (
    <div className="relative h-full grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 p-2 md:p-4">
      <LessonContents toc={toc} />
      <main className="h-full max-w-4xl w-full order-1 md:order-2 min-h-0 overflow-y-auto p-2 md:p-4">
        <MDXProvider components={markDownComponents}>
          <Article />
        </MDXProvider>

        {exercises && exercises.length > 0 && (
          <>
            <Heading
              as="h4"
              mt={"6"}
              mb={"4"}
              size={"5"}
              className="text-[var(--accent-11)] flex items-center gap-1"
            >
              <Brain size={35} />
              <Text as="p">تدريبات</Text>
            </Heading>
            <QuizesTabs quizzes={exercises} lessonId={lessonId} />
          </>
        )}

        {user && (
          <Flex
            direction="column"
            align="center"
            justify={"end"}
            gap="2"
            mt="8"
          >
            <Button
              size={"4"}
              onClick={handleCompleteLesson}
              disabled={isCompleteButtonDisabled}
            >
              {isLessonCompleted
                ? "تم إكمال هذا الدرس"
                : hasCompletedAllQuizzes
                  ? "إكمال الدرس"
                  : "أكمل جميع التمارين أولاً"}
            </Button>

            {isLessonCompleted && progress?.completedAt && (
              <Text size="2" color="gray">
                تم الإكمال في{" "}
                {new Date(progress.completedAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}
          </Flex>
        )}
      </main>
    </div>
  );
}
