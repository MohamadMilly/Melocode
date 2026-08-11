import Article, { frontmatter, toc } from "./truth-about-programming.mdx";

export const lessons = {
  [frontmatter.slug]: {
    Article: Article,
    frontmatter: frontmatter,
    toc: toc,
    exercises: frontmatter.exercises,
  },
};
