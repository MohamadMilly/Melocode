export function getAIText(data: unknown): string {
  if (typeof data === "string") return data;
  console.log(data);
  if (
    typeof data === "object" &&
    data !== null &&
    "choices" in data &&
    Array.isArray(data.choices) &&
    data.choices.length > 0
  ) {
    return data.choices[0].message.content;
  }

  return "لم أتمكن من قراءة رد المساعد.";
}
