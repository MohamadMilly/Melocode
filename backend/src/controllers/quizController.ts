import { type Response } from "express";
import { AuthenticatedRequest } from "../types/index.js";
import * as quizService from "../services/quizService.js";
import type { CreateSubmissionRequestBody } from "@app/types";

export const getQuizAnswer = async (
  req: AuthenticatedRequest<{
    quizAnswerId: string;
  }>,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { quizAnswerId } = req.params;
  
  const quizAnswer = await quizService.getQuizAnswer({
    answerId: Number(quizAnswerId),
    userId: currentUserId,
  });

  return res.json({ quizAnswer });
};

export const getQuizTestCasesInputs = async (
  req: AuthenticatedRequest<{
    quizAnswerId: string;
  }>,
  res: Response,
) => {
  const { quizAnswerId } = req.params;

  const testCases = await quizService.getQuizTestCasesInputs(
    Number(quizAnswerId),
  );

  return res.json({ testCases });
};

export const saveQuizSubmission = async (
  req: AuthenticatedRequest<
    {
      quizAnswerId: string;
    },
    unknown,
    CreateSubmissionRequestBody
  >,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { quizAnswerId } = req.params;
  const { content, language, userOutputs } = req.body;

  const submission = await quizService.saveSubmission({
    content,
    language,
    quizAnswerId: Number(quizAnswerId),
    userOutputs,
    userId: currentUserId,
  });

  return res.status(201).json({ submission });
};

