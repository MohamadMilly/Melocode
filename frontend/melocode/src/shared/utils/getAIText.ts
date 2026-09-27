import type { AIResponse } from "../types/AISideBar.types";

export function getAIText(data: unknown): string {
  if (typeof data === "string") return data;

  const response = data as AIResponse;
  const content = response?.choices?.[0]?.message?.content ?? response?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((part) => part.text ?? "").join("");
  }

  return "لم أتمكن من قراءة رد المساعد.";
}
