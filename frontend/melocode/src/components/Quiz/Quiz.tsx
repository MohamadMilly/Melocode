import { Button, Flex, Tabs, Text } from "@radix-ui/themes";
import { QuizBadge, type QuizBadgeType } from "./QuizBadge";
import { useState } from "react";
import { Code } from "./QuizEmbeddedCode";
import { LessonNote } from "../Lesson/LessonNote";
import { QuizEditor } from "./QuizEditor";

export type QuizQuestion = {
  type: "text" | "note" | "code" | "hint";
  content: string;
  language?: string;
};

export type QuizSolution = {
  type: "text" | "note" | "code";
  content: string;
  language?: string;
};

export type QuizData = {
  badge: QuizBadgeType;
  question: QuizQuestion[];
  solution: QuizSolution[];
};

type QuizProps = {
  name: string;
  quiz: QuizData;
};

export function Quiz({ name, quiz }: QuizProps) {
  const [solutionVisible, setSolutionVisible] = useState<boolean>(false);
  const toggleSolutionVisibility = () => setSolutionVisible(!solutionVisible);
  return (
    <Tabs.Content value={name}>
      <Flex direction={"column"} align={"end"} mb={"4"} p={"2"}>
        <QuizBadge badge={quiz.badge} />
        {quiz.question &&
          Array.isArray(quiz.question) &&
          quiz.question.map((quiz) => {
            switch (quiz.type) {
              case "text":
                return (
                  <Text dir="auto" as={"p"}>
                    {quiz.content}
                  </Text>
                );
              case "code":
                return <QuizEditor initialCode={quiz.content} />;

              case "note":
                return <LessonNote>{quiz.content}</LessonNote>;

              default:
                return (
                  <Text as="p" dir="auto">
                    {quiz.content}
                  </Text>
                );
            }
          })}
      </Flex>
      <Flex direction={"column"} gap={"2"} align={"end"}>
        <Button onClick={toggleSolutionVisibility}>
          {solutionVisible ? "إخفاء الحل" : "إظهار الحل"}
        </Button>
        {solutionVisible &&
          quiz.solution &&
          Array.isArray(quiz.solution) &&
          quiz.solution.map((solutionObj) => {
            switch (solutionObj.type) {
              case "text":
                return (
                  <Text dir="auto" as={"p"}>
                    {solutionObj.content}
                  </Text>
                );
              case "code":
                return (
                  <Code
                    code={solutionObj.content}
                    lang={solutionObj.language}
                  />
                );

              case "note":
                return <LessonNote>{solutionObj.content}</LessonNote>;

              default:
                return (
                  <Text as="p" dir="auto">
                    {solutionObj.content}
                  </Text>
                );
            }
          })}
      </Flex>
    </Tabs.Content>
  );
}
