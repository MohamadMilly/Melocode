import type { Language } from "../types/languages.types";

export const compilers: Record<Language, string> = {
  javascript: "typescript-deno",
  cpp: "g++-15",
};
