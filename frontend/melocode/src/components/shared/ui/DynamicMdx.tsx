import React, { useState, useEffect } from "react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

// Import your exact same plugin stack
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { useMDXComponents } from "@mdx-js/react";
type DynamicMarkdownProps = {
  rawText: string;
};

export function DynamicMarkdown({ rawText }: DynamicMarkdownProps) {
  const [MDXComponent, setMDXComponent] = useState<React.ComponentType | null>(
    null,
  );

  useEffect(() => {
    async function compileText() {
      try {
        const { default: Component } = await evaluate(rawText, {
          ...runtime,
          useMDXComponents: useMDXComponents,
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: "tokyo-night",
                keepBackground: true,
                defaultLang: "plaintext",
              },
            ],
          ],
        });

        setMDXComponent(() => Component);
      } catch (error) {
        console.error("Failed to compile text string:", error);
      }
    }

    compileText();
  }, [rawText]);

  if (!MDXComponent) return <div>يتم تحضير الرد...</div>;

  return <MDXComponent />;
}
