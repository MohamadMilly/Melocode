import type { ResponseError } from "@app/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { compilers } from "../../../shared/constants/compilers.constants";
import type { Language } from "../../../shared/types/languages.types";

type RunCodeOutput = {
  output: string;
  status: "success" | "error";
  error?: string;
  exit_code: number;
  time: string;
};

const runCode = async ({
  code,
  language,
}: {
  code: string;
  language: Language;
}): Promise<RunCodeOutput> => {
  const compiler = compilers[language];
  const response = await axios.post<RunCodeOutput>(
    "/compiler-api/api/run-code-sync/",
    {
      compiler,
      code: code,
    },
    {
      headers: {
        Authorization: import.meta.env.VITE_ONLINE_COMPILER_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );
  if (response.data.status === "error") {
    throw new Error(response.data.error || "حدث خطأ أثناء تنفيذ الكود");
  }
  return response.data;
};

export function useRunCode() {
  return useMutation<
    RunCodeOutput,
    AxiosError<ResponseError>,
    { code: string; language: Language }
  >({
    mutationKey: ["run-code"],
    mutationFn: runCode,
    onError: (error) => {
      console.error("Code execution failed:", error);
    },
  });
}
