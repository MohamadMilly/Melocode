import { Text } from "@radix-ui/themes";
import { BrainCircuit, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGPT } from "../../../hooks/api/ai/useGPT";
import { getAIText } from "../../../shared/utils/getAIText";
import type { ChatMessageData } from "../../../shared/types/AISideBar.types";
import { Input } from "../ui/Input";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { SideBar } from "../ui/SideBar";

type AISideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AISideBar({ isOpen, onClose }: AISideBarProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutateAsync, isPending } = useGPT();

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  async function sendMessage(content: string) {
    setMessages((current) => [...current, { role: "user", content }]);
    try {
      const response = await mutateAsync({
        prompt: content,
        context: messages,
      });
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: getAIText(response),
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "تعذر إرسال الرسالة.",
        },
      ]);
    }
  }

  const visibleMessages = messages.filter((message) =>
    message.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <SideBar
      isOpen={isOpen}
      onClose={onClose}
      title="مساعد ميلوكود"
      closeLabel="إغلاق المساعد"
      description="اسأل عن البرمجة وتعلّمها"
      icon={<BrainCircuit size={22} />}
    >
      <div className="border-b border-[var(--gray-7)] px-4 py-2 sm:px-5">
        <Input
          aria-label="ابحث في المحادثة"
          className="border text-[var(--gray-9)]"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث في المحادثة"
          type="search"
          value={search}
        />
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-5 sm:px-5">
        {visibleMessages.length === 0 && (
          <Text
            as="p"
            size="2"
            className="py-10 text-center leading-relaxed text-[var(--gray-9)]"
          >
            {messages.length === 0
              ? "ابدأ محادثة جديدة مع المساعد"
              : "لا توجد رسائل مطابقة"}
          </Text>
        )}
        {visibleMessages.map((message, index) => (
          <ChatMessage key={`${message.role}-${index}`} message={message} />
        ))}
        {isPending && (
          <div
            className="flex items-center gap-2 px-1 text-[var(--gray-10)]"
            role="status"
          >
            <LoaderCircle size={16} className="animate-spin" />
            <Text size="2">يفكر المساعد...</Text>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-5">
        <ChatInput disabled={isPending} onSend={sendMessage} />
      </div>
    </SideBar>
  );
}
