import type { Language } from "../types/languages.types";

const PATTERNS: Record<Language, RegExp> = {
  javascript:
    /function\s+([a-zA-Z0-9_$]+)\s*\(|const\s+([a-zA-Z0-9_$]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>/g,

  cpp: /\b(?!if\b|while\b|for\b|switch\b|return\b|catch\b)(?:[a-zA-Z_][a-zA-Z0-9_<>\*&\s::]*\s+)+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\)\s*\{/g,
};

export function extractFunctionsNames(code: string, language: Language) {
  const regex = PATTERNS[language];
  if (!regex) return [];

  // Reset regex internal state for safe sequential execution
  regex.lastIndex = 0;

  const matches = [];
  let match;
  // regex.exec returns the first match and updates the index , so we need to keep calling this function until we reach the end of the
  // code , and this what this code does
  while ((match = regex.exec(code)) !== null) {
    // For JS: check group 1 (traditional function) or group 2 (arrow function)
    // For C/C++: group 2 captures the function name
    const name = match[1] || match[2];
    if (name) matches.push(name);
  }
  return matches;
}
