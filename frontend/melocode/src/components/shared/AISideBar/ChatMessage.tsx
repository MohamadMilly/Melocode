import { Text } from "@radix-ui/themes";
import type { ChatMessageData } from "../../../shared/types/AISideBar.types";

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[88%] rounded-lg px-3 py-2 ${
          isUser
            ? "bg-[var(--accent-11)] text-[var(--gray-1)]"
            : "border border-[var(--gray-6)] bg-[var(--gray-2)] text-[var(--gray-12)]"
        }`}
      >
        <Text
          as="p"
          size="2"
          className="whitespace-pre-wrap break-words"
          dir="auto"
        >
          {message.content}
        </Text>
      </div>
    </div>
  );
}
