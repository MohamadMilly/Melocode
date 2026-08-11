import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { useEffect, useState, type ComponentPropsWithRef } from "react";

type CodeProps = {
  code: string;
  lang?: string;
} & ComponentPropsWithRef<"div">;

export function Code({ code, lang = "javascript", ...props }: CodeProps) {
  const [highlightedCode, setHighLightedCode] = useState<string>("");

  useEffect(() => {
    highlightCode(code, lang).then((response) => setHighLightedCode(response));
  }, [code, lang]);

  return (
    <div
      {...props}
      className="w-full outline-0 whitespace-pre-wrap"
      dangerouslySetInnerHTML={{
        __html: highlightedCode,
      }}
    />
  );
}

async function highlightCode(code: string, lang: string) {
  const markdownContent = `\`\`\`${lang}\n${code}\n\`\`\``;

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "tokyo-night",
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(markdownContent);

  return String(file);
}
