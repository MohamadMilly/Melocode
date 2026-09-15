import { Skeleton, Text } from "@radix-ui/themes";

import { LessonNote } from "../Lesson/LessonNote";
import { lazy, Suspense } from "react";
import type { QuizQuestionItem } from "../../shared/types/Quiz.types";
import { QuizHint } from "./QuizHint";
import { OptionsList } from "./multiple_choice/OptionsList";

const QuizEditor = lazy(() =>
  import("./QuizEditor").then((module) => ({ default: module.QuizEditor })),
);
export function QuizQuestion({
  questionItems,

  editorDisabled,
}: {
  questionItems: QuizQuestionItem[];

  editorDisabled: boolean;
}) {
  return (
    <>
      {Array.isArray(questionItems) &&
        questionItems.map((quiz) => {
          switch (quiz.type) {
            case "text":
              return (
                <Text dir="auto" as={"p"}>
                  {quiz.content}
                </Text>
              );
            case "code":
              return (
                <Suspense
                  fallback={
                    <Skeleton width={"100%"} height={"100px"}></Skeleton>
                  }
                >
                  <QuizEditor
                    disabled={editorDisabled || !quiz.isInteractive}
                  />
                </Suspense>
              );

            case "note":
              return <LessonNote>{quiz.content}</LessonNote>;

            case "hint":
              return <QuizHint>{quiz.content}</QuizHint>;

            case "options":
              return <OptionsList options={quiz.options ?? []} />;
            default:
              quiz.type satisfies never;
              return (
                <Text as="p" dir="auto">
                  {quiz.content}
                </Text>
              );
          }
        })}{" "}
    </>
  );
}
