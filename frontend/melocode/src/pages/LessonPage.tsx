import { useParams } from "react-router";
import { Heading, Text } from "@radix-ui/themes";

import { MDXProvider } from "@mdx-js/react";
import { markDownComponents } from "../components/Lesson/MarkDownComponents";
import { lessons } from "../lessons/lessons";
import { QuizesTabs } from "../components/Quiz/QuizzesTabs";
import { Brain } from "lucide-react";
import { LessonContents } from "../components/Lesson/LessonContents";

export function LessonPage() {
  const { slug } = useParams();

  const lesson = lessons[slug as string];
  if (!lesson) {
    return <Text>Lesson is not found.</Text>;
  }
  const { Article, toc, exercises } = lesson;
  return (
    <div className="relative h-full grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 p-2 md:p-4">
      <LessonContents toc={toc} />
      <main className="h-full max-w-4xl w-full order-1 md:order-2 min-h-0 overflow-y-auto p-4">
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
              <span>تدريبات</span>
            </Heading>
            <QuizesTabs quizzes={exercises} />
          </>
        )}
      </main>
    </div>
  );
}
