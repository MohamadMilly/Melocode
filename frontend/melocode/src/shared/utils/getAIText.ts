export function getAIText(data: unknown): string {
  if (typeof data === "string") return data;

  if (
    typeof data === "object" &&
    data !== null &&
    "answer" in data &&
    typeof data.answer === "string"
  ) {
    return data.answer;
  }

  return "لم أتمكن من قراءة رد المساعد.";
}
