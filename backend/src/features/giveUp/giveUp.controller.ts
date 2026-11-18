import type { CreateQuizGiveUpResponseDto } from "@app/types";
import type { Response } from "express";
import type { QuizIdParams } from "../../shared/types/quizHttp.js";
import type { AuthenticatedRequest } from "../../shared/types/auth.types.js";
import * as giveUpService from "./giveUp.service.js";

export const createGiveUp = async (
  req: AuthenticatedRequest<QuizIdParams>,
  res: Response<CreateQuizGiveUpResponseDto>,
) => {
  const userId = req.currentUser?.id as number;
  const { external_quizId } = req.params;
  const giveUp = await giveUpService.giveUpToQuiz(external_quizId, userId);

  return res.status(201).json({ giveUp });
};
