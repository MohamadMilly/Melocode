import type { ChatMessageData } from "../../../shared/types/AISideBar.types";
import { DynamicMarkdown } from "../ui/DynamicMdx";
import { MDXProvider } from "@mdx-js/react";
import { markDownComponents } from "../../Lesson/MarkDownComponents";
import { Text } from "@radix-ui/themes";

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        dir="auto"
        className={`max-w-19/20 rounded-3xl px-4 py-3 leading-relaxed ${
          isUser
            ? "rounded-br-lg border border-[var(--accent-8)] bg-[var(--accent-9)] text-[var(--gray-1)]"
            : "rounded-bl-lg border border-[var(--gray-7)] bg-[var(--gray-2)] text-[var(--gray-12)]"
        }`}
      >
        {isUser ? (
          <Text as="p" className="leading-relaxed">
            {message.content}
          </Text>
        ) : (
          <MDXProvider components={markDownComponents}>
            <DynamicMarkdown rawText={message.content} />
          </MDXProvider>
        )}
      </div>
    </div>
  );
}
