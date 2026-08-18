import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type RunCodeOutput = {
  output: string;
  status: "success" | "error";
  exit_code: number;
  time: string;
};

const runCode = async (code: string): Promise<RunCodeOutput> => {
  const response = await axios.post<RunCodeOutput>(
    "/compiler-api/api/run-code-sync/",
    {
      compiler: "typescript-deno",
      code: code,
    },
    {
      headers: {
        Authorization: import.meta.env.VITE_ONLINE_COMPILER_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export function useRunCode() {
  return useMutation({
    mutationKey: ["run-code"],
    mutationFn: runCode,
    onError: (error) => {
      console.error("Code execution failed:", error);
    },
  });
}
