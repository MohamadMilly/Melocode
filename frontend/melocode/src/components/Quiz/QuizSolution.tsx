import { Flex, Skeleton,  Text } from "@radix-ui/themes";
import type { QuizAnswerItem } from "@app/types";
import { LessonNote } from "../Lesson/LessonNote";
import { Code } from "./QuizEmbeddedCode";
import { useQuizAnswer } from "../../hooks/api/quiz/useQuizAnswer";
import { ErrorElement } from "../ui/ErrorElement";

type QuizSolutionProps = {
  quizId: string;
};

export function QuizSolution({ quizId }: QuizSolutionProps) {
  const { answer, isLoading, error } = useQuizAnswer(quizId);

  if (isLoading) return <Skeleton width={"100%"} height={"100px"} />;
  if (error) return <ErrorElement axiosError={error} />;
  if (!answer) return <Text as={"p"}>لم يتم ايجاد الحل...</Text>;
  const answerItems = answer.items;
  return (
    <Flex direction={"column"} mb={"4"} p={"2"} className="w-full">
      {answer &&
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
