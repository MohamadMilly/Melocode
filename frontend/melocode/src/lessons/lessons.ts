import type { ComponentType } from "react";
import type { QuizData } from "../shared/types/Quiz.types";

const slugs = [
  "truth-about-programming",
  "learning-mindset",
  "what-is-the-web",
  "what-is-web-development-and-web-developer",
  "installations",
  "command-line-basics",
  "intro-to-html",
  "working-with-text",
];

const cache = new Map();

export const lessons: Record<
  string,
  () => Promise<{
    Article: ComponentType<unknown>;
    toc: { slug: string; text: string }[];
    frontmatter: {
      title: string;
      slug: string;
      lessonId: number;
    };
    exercises: QuizData[];
  }>
> = slugs.reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: function () {
      const currentSlug = curr; // to fix closures bug

      if (cache.has(currentSlug)) return cache.get(currentSlug);

      const loadPromise = (async () => {
        const module = await import(`./${currentSlug}.mdx`);
        return {
          Article: module.default,
          toc: module.toc,
          exercises: module.frontmatter.exercises,
          frontmatter: module.frontmatter,
        };
      })();

      cache.set(currentSlug, loadPromise);
      return loadPromise;
    },
  };
}, {});
