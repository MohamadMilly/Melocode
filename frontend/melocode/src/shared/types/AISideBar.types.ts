export type AIResponse = {
  choices?: Array<{
    message?: { content?: string | Array<{ text?: string }> };
  }>;
  content?: string | Array<{ text?: string }>;
};

export type ChatMessageData = {
  role: "user" | "assistant";
  content: string;
};
