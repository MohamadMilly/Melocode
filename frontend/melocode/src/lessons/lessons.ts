import * as truthAboutProgrammingLesson from "./truth-about-programming.mdx";
import * as learningMindsetLesson from "./learning-mindset.mdx";
import * as whatIsTheWebLesson from "./what-is-the-web.mdx";
import * as whatIsWebDevelopmentAndWebDeveloper from "./what-is-web-development-and-web-developer.mdx";
import type { ComponentType } from "react";
import type { QuizData } from "../shared/types/Quiz.types";

type Lesson = typeof truthAboutProgrammingLesson;

const groupedLessonsData: Lesson[] = [
  truthAboutProgrammingLesson,
  learningMindsetLesson,
  whatIsTheWebLesson,
  whatIsWebDevelopmentAndWebDeveloper,
];

export const lessons: Record<
  string,
  Lesson & { exercises: QuizData[]; Article: ComponentType<unknown> }
> = groupedLessonsData.reduce((acc, curr) => {
  return {
    ...acc,
    [curr.frontmatter.slug]: {
      Article: curr.default,
      toc: curr.toc,
      exercises: curr.frontmatter.exercises,
      frontmatter: curr.frontmatter,
    },
  };
}, {});
