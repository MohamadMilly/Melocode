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
    <form onSubmit={submitMessage} className="flex items-end gap-2">
      <Textarea
        aria-label="اكتب رسالتك"
        autoComplete="off"
        disabled={disabled}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اكتب رسالتك..."
        rows={2}
        value={message}
      />
      <Button
        aria-label="إرسال الرسالة"
        className="!h-10 !w-10 !shrink-0 !p-0"
        disabled={disabled || !message.trim()}
        type="submit"
        variant="solid"
      >
        <ArrowUp size={18} />
      </Button>
    </form>
  );
}
