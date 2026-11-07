import { type Response } from "express";
import { AuthenticatedRequest } from "../types/index.js";
import * as quizService from "../services/quizService.js";
import type { CreateSubmissionRequestBody } from "@app/types";

export const getQuizAnswer = async (
  req: AuthenticatedRequest<{ external_quizId: string }>,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { external_quizId } = req.params;

  const quizAnswer = await quizService.getQuizAnswer({
    external_quizId,
    userId: currentUserId,
  });

  return res.json({ quizAnswer });
};

export const getQuizTestCasesInputs = async (
  req: AuthenticatedRequest<{ external_quizId: string }>,
  res: Response,
) => {
  const { external_quizId } = req.params;
  const testCases =
    await quizService.getQuizTestCasesInputs(external_quizId);

  return res.json({ testCases });
};

export const saveQuizSubmission = async (
  req: AuthenticatedRequest<
    { external_quizId: string },
    unknown,
    CreateSubmissionRequestBody
  >,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { external_quizId } = req.params;
  const { content, language, userOutputs, type } = req.body;

  const submission = await quizService.saveSubmission({
    content,
    language,
    external_quizId,
    userOutputs,
    type: type ?? "CODING",
    userId: currentUserId,
  });

  return res.status(201).json({ submission });
};
