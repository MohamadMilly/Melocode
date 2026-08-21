import { Text } from "@radix-ui/themes";
import type { QuizQuestionItem } from "./Quiz";
import { QuizEditor } from "./QuizEditor";
import { LessonNote } from "../Lesson/LessonNote";
import type { Dispatch, SetStateAction } from "react";

export function QuizQuestion({
  questionItems,
  code,
  setCode,
  editorDisabled,
}: {
  questionItems: QuizQuestionItem[];
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
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
                <QuizEditor
                  disabled={editorDisabled}
                  code={code}
                  setCode={setCode}
                />
              );

            case "note":
              return <LessonNote>{quiz.content}</LessonNote>;

            default:
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
