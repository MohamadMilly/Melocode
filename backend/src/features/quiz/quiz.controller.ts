import type { GetQuizAnswerResponseDto } from "@app/types";
import type { Response } from "express";
import type { QuizIdParams } from "../../shared/types/quizHttp.js";
import type { AuthenticatedRequest } from "../../shared/types/auth.types.js";
import * as quizService from "./quiz.service.js";

export const getQuizAnswer = async (
  req: AuthenticatedRequest<QuizIdParams>,
  res: Response<GetQuizAnswerResponseDto>,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { external_quizId } = req.params;

  const quizAnswer = await quizService.getQuizAnswer({
    external_quizId,
    userId: currentUserId,
  });

  return res.json({ quizAnswer });
};
