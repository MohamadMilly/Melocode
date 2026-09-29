import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { AIResponse } from "../../../shared/types/AISideBar.types";

async function fetchAI(prompt: string): Promise<AIResponse> {
  const response = await axios.post<AIResponse>(
    import.meta.env.VITE_GPT_AI_API_URL,
    {
      model: "gpt-5",
      "system-prompt": "You should Answer Programming Questions Only.",
      prompt,
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
