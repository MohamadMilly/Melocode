import { Navigate, useNavigate, useParams } from "react-router";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { MDXProvider } from "@mdx-js/react";
import { markDownComponents } from "../../components/Lesson/MarkDownComponents";
import { lessons } from "../../lessons/lessons";
import { QuizesTabs } from "../../components/Quiz/QuizzesTabs";
import toast from "react-hot-toast";
import { LessonContents } from "../../components/Lesson/LessonContents";
import { useCompleteLesson } from "../../hooks/api/me/useCompleteLesson";
import { useAuth } from "../../contexts/AuthContext";
import { EmptyLessonState } from "../../components/Lesson/EmptyLessonState";
import { useLesson } from "../../hooks/api/lesson/useLesson";
import { LessonPagination } from "../../components/Lesson/LessonPagination";
import { Brain } from "lucide-react";

export function LessonPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { mutate: completeLesson, isPending: isCompleting } =
    useCompleteLesson();
  const { user } = useAuth();

  const lesson = lessons[slug as string];

  const {
    lesson: lessonMetaData,
    progress,
    hasCompletedAllQuizzes,
    previousLessonStatus,
    previousLessonSlug,
    nextLessonSlug,
    nextLessonStatus,
    isLoading: isProgressLoading,
  } = useLesson(lesson ? lesson.frontmatter.lessonId : undefined);

  if (!lesson) {
    return <EmptyLessonState />;
  }

  const { Article, toc, exercises, frontmatter } = lesson;

  // Derived values
  const lessonId = frontmatter.lessonId;

  const isLessonCompleted = !!progress?.completedAt;
  const isCompleteButtonDisabled =
    isProgressLoading ||
    isCompleting ||
    !hasCompletedAllQuizzes ||
    isLessonCompleted;

  const canNavigateToPreviousLesson =
    previousLessonStatus === "current" || previousLessonStatus === "completed";
  const canNavigateToNextLesson =
    nextLessonStatus === "current" || nextLessonStatus === "completed";
  // handlers
  const handlePreviousLesson = () => {
    if (canNavigateToPreviousLesson && previousLessonSlug) {
      navigate(`/app/lessons/${previousLessonSlug}`);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleCompleteLesson = () => {
    if (!user) return;
    completeLesson(lessonId);
  };
  const handleNextLesson = () => {
    if (canNavigateToNextLesson && nextLessonSlug) {
      navigate(`/app/lessons/${nextLessonSlug}`);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // if the previous lesson is not completed ... go to the main page
  if (lessonMetaData?.status === "locked") {
    toast.error("أكمل الدرس السابق أولاً");
    return <Navigate to={"/app"} replace />;
  }
  return (
    <div className="relative h-full grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 px-2 sm:px-3">
      <LessonContents toc={toc} />
      <main className="h-full max-w-4xl w-full order-1 md:order-2 min-h-0 overflow-y-auto py-6 p-2 md:py-12 md:p-4">
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
        <LessonPagination
          canNavigateToNextLesson={canNavigateToNextLesson}
          canNavigateToPreviousLesson={canNavigateToPreviousLesson}
          handleNextLesson={handleNextLesson}
          handlePreviousLesson={handlePreviousLesson}
        />
      </main>
    </div>
  );
}
