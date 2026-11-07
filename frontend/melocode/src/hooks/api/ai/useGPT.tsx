import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type {
  AIResponse,
  ChatMessageData,
} from "../../../shared/types/AISideBar.types";

async function fetchAI({
  prompt,
  context,
}: {
  prompt: string;
  context: ChatMessageData[];
}): Promise<AIResponse> {
  const response = await axios.post<AIResponse>(
    import.meta.env.VITE_GPT_AI_API_URL,
    {
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content:
            "You are called Melocode assistant. You must answer programming questions only! , NEVER answer questions out of programming scope!.",
        },
        {
          role: "system",
          content:
            "Act as a strict Markdown writer. Use only standard, vanilla Markdown syntax with absolutely zero raw HTML or attributes—except for the <LessonNote>your notes here</LessonNote> tag to enclose your notes. Never use or invent any other custom components or tags (such as <Entity>, <Card>, or <Item>). If you want to talk about an entity, write it as plain text.",
        },
        ...context,
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    },
  );

  return response.data;
}

export function useGPT() {
  return useMutation({
    mutationKey: ["gpt-5"],
    mutationFn: fetchAI,
  });
}
