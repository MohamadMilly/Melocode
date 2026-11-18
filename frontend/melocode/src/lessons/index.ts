import type { ComponentType } from "react";
import type { QuizData } from "../shared/types/Quiz.types";

const paths: Record<string, { path: string; file: string }> = {
  "truth-about-programming": {
    path: "./web-development/foundations_module",
    file: "truth-about-programming.mdx",
  },
  "learning-mindset": {
    path: "./web-development/foundations_module",
    file: "learning-mindset.mdx",
  },
  "what-is-the-web": {
    path: "./web-development/foundations_module",
    file: "what-is-the-web.mdx",
  },
  "what-is-web-development-and-web-developer": {
    path: "./web-development/foundations_module",
    file: "what-is-web-development-and-web-developer.mdx",
  },
  installations: {
    path: "./web-development/foundations_module",
    file: "installations.mdx",
  },
  "command-line-basics": {
    path: "./web-development/foundations_module",
    file: "command-line-basics.mdx",
  },
  "intro-to-html": {
    path: "./web-development/foundations_module",
    file: "intro-to-html.mdx",
  },
  "working-with-text": {
    path: "./web-development/foundations_module",
    file: "working-with-text.mdx",
  },
  lists: {
    path: "./web-development/foundations_module",
    file: "lists.mdx",
  },
  "setup-cpp": {
    path: "./cpp/basics_module",
    file: "setup-cpp.mdx",
  },
  "binary-and-decimal-systems": {
    path: "./cpp/basics_module",
    file: "binary-and-decimal-systems.mdx",
  },
  "hexadecimal-system": {
    path: "./cpp/basics_module",
    file: "hexadecimal-system.mdx",
  },
  "octal-system": {
    path: "./cpp/basics_module",
    file: "octal-system.mdx",
  },
  algorithms: {
    path: "./cpp/basics_module",
    file: "algorithms.mdx",
  },
  "programming-language-generations": {
    path: "./cpp/basics_module",
    file: "programming-language-generations.mdx",
  },
  "programming-languages-comparison": {
    path: "./cpp/basics_module",
    file: "programming-languages-comparison.mdx",
  },
};

type LessonModule = {
  default: ComponentType<unknown>;
  toc: { slug: string; text: string }[];
  frontmatter: {
    title: string;
    slug: string;
    lessonId: number;
    exercises: QuizData[];
  };
};

const mdxModules = import.meta.glob<LessonModule>("./**/*.mdx");

const cache = new Map<string, Promise<LessonModule>>();

export function getLesson(
  slug: string,
): Promise<LessonModule | undefined> | undefined {
  if (cache.has(slug)) {
    return cache.get(slug);
  }
  const pathData = paths[slug];
  if (!pathData) {
    return Promise.resolve(undefined);
  }

  const filePath = `${pathData.path}/${pathData.file}`;
  const loader = mdxModules[filePath];

  if (!loader) {
    console.error(`MDX module not found for path: ${filePath}`);
    return Promise.resolve(undefined);
  }

  const modulePromise = loader();
  cache.set(slug, modulePromise);

  return modulePromise;
}
