import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { AIResponse } from "../../../shared/types/AISideBar.types";

async function fetchAI(prompt: string): Promise<AIResponse> {
  const response = await axios.post<AIResponse>(
    import.meta.env.VITE_GPT_AI_API_URL,
    {
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content:
            "You must answer programming questions only! , NEVER answer questions out of programming scope!.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    },
  );
  console.log("AI response:", response.data);
  return response.data;
}

export function useGPT() {
  return useMutation({
    mutationKey: ["gpt-5"],
    mutationFn: fetchAI,
  });
}
