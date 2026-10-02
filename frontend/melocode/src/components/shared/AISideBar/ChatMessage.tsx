import type { ChatMessageData } from "../../../shared/types/AISideBar.types";
import { DynamicMarkdown } from "../ui/DynamicMdx";
import { MDXProvider } from "@mdx-js/react";
import { markDownComponents } from "../../Lesson/MarkDownComponents";
import { Text } from "@radix-ui/themes";

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex  ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        dir="auto"
        className={`max-w-19/20 rounded-lg px-3 py-2 ${
          isUser
            ? "bg-[var(--accent-11)] text-[var(--gray-1)]"
            : "border border-[var(--gray-6)] bg-[var(--gray-2)] text-[var(--gray-12)]"
        }`}
      >
        {isUser ? (
          <Text as="p">{message.content}</Text>
        ) : (
          <MDXProvider components={markDownComponents}>
            <DynamicMarkdown rawText={message.content} />
          </MDXProvider>
        )}
      </div>
    </div>
  );
}
