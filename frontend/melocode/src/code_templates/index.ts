import { getCppToRunCode } from "./cpp.template";
import { getJsToRunCode } from "./javascript.template";

export const templates = {
  javascript: getJsToRunCode,
  cpp: getCppToRunCode,
};
