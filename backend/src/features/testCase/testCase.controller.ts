import type { GetQuizTestCasesResponseDto } from "@app/types";
import type { Response } from "express";
import type { QuizIdParams } from "../../shared/types/quizHttp.js";
import type { AuthenticatedRequest } from "../../shared/types/auth.types.js";
import * as testCaseService from "./testCase.service.js";

export const getQuizTestCasesInputs = async (
  req: AuthenticatedRequest<QuizIdParams>,
  res: Response<GetQuizTestCasesResponseDto>,
) => {
  const { external_quizId } = req.params;
  const testCases =
    await testCaseService.getQuizTestCasesInputs(external_quizId);

  return res.json({ testCases });
};
