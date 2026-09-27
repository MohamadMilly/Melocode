import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function fetchAI(prompt: string) {
  const response = await axios.post(import.meta.env.VITE_CLAUDE_AI_API_URL, {
    model: "free/claude-opus-4.6",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.data;
}

export function useOpus() {
  return useMutation({
    mutationKey: ["opus-4.6"],
    mutationFn: fetchAI,
  });
}
