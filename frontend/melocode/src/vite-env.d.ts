declare module "*.md" {
  import React from "react";

  const Component: React.ComponentType<unknown>;
  export default Component;

  export const frontmatter: {
    title: string;
    slug: string;
    
    exercises: import("./components/Quiz/Quiz").QuizData[];
  };

  export const toc: Array<{
    depth: number;
    text: string;
    slug: string;
  }>;
}

declare module "*.mdx" {
  import React from "react";
  const Component: React.ComponentType<unknown>;
  export default Component;

  export const frontmatter: {
    title: string;
    slug: string;
    exercises: import("./components/Quiz/Quiz").QuizData[];
  };
  export const toc: Array<{ text: string; slug: string }>;
}
