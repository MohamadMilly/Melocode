import { Text } from "@radix-ui/themes";
import { BrainCircuit, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOpus } from "../../../hooks/api/ai/useOpus";
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
  const { mutateAsync, isPending } = useOpus();

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
      const response = await mutateAsync(content);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: getAIText(response) },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "تعذر إرسال الرسالة. تحقق من الاتصال وحاول مرة أخرى.",
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
      <div className="border-b border-[var(--gray-4)] px-4 py-3">
        <Input
          aria-label="ابحث في المحادثة"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث في المحادثة"
          type="search"
          value={search}
        />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto md:px-4 px-2 py-4">
        {visibleMessages.length === 0 && (
          <Text as="p" size="2" color="gray" className="py-8 text-center">
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
            className="flex items-center gap-2 text-[var(--gray-10)]"
            role="status"
          >
            <LoaderCircle size={16} className="animate-spin" />
            <Text size="2">يفكر المساعد...</Text>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[var(--gray-6)] p-4">
        <ChatInput disabled={isPending} onSend={sendMessage} />
      </div>
    </SideBar>
  );
}
