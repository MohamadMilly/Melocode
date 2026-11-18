import { ArrowUp } from "lucide-react";
import { useState, type KeyboardEvent, type SubmitEvent } from "react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";

type ChatInputProps = {
  disabled: boolean;
  onSend: (message: string) => void;
};

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function submitMessage(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSend(trimmedMessage);
    setMessage("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <form
      onSubmit={submitMessage}
      className="flex items-end gap-2 rounded-3xl border border-[var(--gray-7)] bg-[var(--gray-2)] p-2.5 shadow-[0_12px_36px_color-mix(in_srgb,var(--gray-8)_18%,transparent)]"
    >
      <Textarea
        aria-label="اكتب رسالتك"
        autoComplete="off"
        className="!min-h-12 !max-h-40 !resize-none !rounded-2xl !border-0 !bg-transparent !px-3 !py-3 !leading-relaxed !text-[var(--gray-12)] !shadow-none placeholder:!text-[var(--gray-9)] [field-sizing:content] focus:!outline-none focus:!ring-0"
        disabled={disabled}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اكتب رسالتك..."
        rows={2}
        value={message}
      />
      <Button
        aria-label="إرسال الرسالة"
        className="!h-11 !w-11 !shrink-0 !rounded-2xl !border !border-[var(--accent-8)] !bg-[var(--accent-9)] !p-0 !text-[var(--gray-1)] hover:!bg-[var(--accent-10)]"
        disabled={disabled || !message.trim()}
        type="submit"
        variant="solid"
      >
        <ArrowUp size={18} />
      </Button>
    </form>
  );
}
