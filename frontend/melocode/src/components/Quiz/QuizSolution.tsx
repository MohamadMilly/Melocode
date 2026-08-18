import { Flex, Spinner, Text } from "@radix-ui/themes";
import type { QuizAnswerItem, QuizAnswer, ResponseError } from "@app/types";
import { LessonNote } from "../Lesson/LessonNote";
import { Code } from "./QuizEmbeddedCode";
import type { AxiosError } from "axios";

type QuizSolutionProps = {
  solutionVisible: boolean;
  answer: QuizAnswer | null;
  isLoading: boolean;
  error: AxiosError<ResponseError> | null;
};

export function QuizSolution({
  answer,
  isLoading,
  error,
  solutionVisible,
}: QuizSolutionProps) {
  const answerItems = answer?.items;
  if (!solutionVisible) return null;
  if (isLoading) return <Spinner size={"2"} />;
  if (error)
    return (
      <Text as="p">
        Error: {error.response?.data.message || error.message || error.status}
      </Text>
    );
  if (!answer) return <Text as={"p"}>لم يتم ايجاد الحل...</Text>;
  return (
    <Flex direction={"column"} mb={"4"} p={"2"} className="w-full">
      {solutionVisible &&
        answer &&
        Array.isArray(answerItems) &&
        answerItems.map((item: QuizAnswerItem) => {
          switch (item.type) {
            case "TEXT":
              return (
                <Text dir="auto" as={"p"}>
                  {item.content}
                </Text>
              );
            case "CODE":
              return <Code code={item.content} lang={item.language} />;

            case "NOTE":
              return <LessonNote>{item.content}</LessonNote>;

            default:
              return (
                <Text as="p" dir="auto">
                  {item.content}
                </Text>
              );
          }
        })}
    </Flex>
  );
}
