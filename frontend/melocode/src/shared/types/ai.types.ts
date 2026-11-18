export type AIResponse = {
  ok: boolean;
  model: string;
  "system prompt": string;
  prompt: string;
  answer: string;
  rights: string;
  choices?: Array<{
    message?: { content?: string | Array<{ text?: string }> };
  }>;
  content?: string | Array<{ text?: string }>;
};

export type ChatMessageData = {
  role: "user" | "assistant";
  content: string;
};
