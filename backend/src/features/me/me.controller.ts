import type {
  GetLessonQuizzesGiveUpsResponse,
  GetLessonQuizzesSubmissionsResponse,
  GetQuizGiveUpResponseDto,
  GetQuizSubmissionsResponseDto,
} from "@app/types";
import type { Response } from "express";
import type { AuthenticatedRequest } from "../../shared/types/auth.types.js";
import type {
  GetLessonQuizSubmissionsQuery,
  LessonSlugParams,
  QuizIdParams,
} from "../../shared/types/quizHttp.js";
import * as meService from "./me.service.js";

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const userId = req.currentUser?.id as number;
  const user = await meService.getCurrentUser(userId);
  res.json({ user });
};

export const getLessonSubmissions = async (
  req: AuthenticatedRequest<
    LessonSlugParams,
    unknown,
    {},
    GetLessonQuizSubmissionsQuery
  >,
  res: Response<GetLessonQuizzesSubmissionsResponse>,
) => {
  const userId = req.currentUser?.id as number;
  const { slug } = req.params;
  const { isCorrect } = req.query;
  const parsedIsCorrect = isCorrect ? JSON.parse(isCorrect) : undefined;
  const submissionsData = await meService.getLessonSubmissions(
    userId,
    slug,
    parsedIsCorrect,
  );
  res.json({ submissionsData });
};

export const getQuizSubmissions = async (
  req: AuthenticatedRequest<QuizIdParams>,
  res: Response<GetQuizSubmissionsResponseDto>,
) => {
  const userId = req.currentUser?.id as number;
  const submissions = await meService.getQuizSubmissions(
    userId,
    req.params.external_quizId,
  );
  res.json({ submissions });
};

export const getQuizGiveUp = async (
  req: AuthenticatedRequest<QuizIdParams>,
  res: Response<GetQuizGiveUpResponseDto>,
) => {
  const userId = req.currentUser?.id as number;
  const giveUp = await meService.getQuizGiveUp(
    userId,
    req.params.external_quizId,
  );
  res.json({ giveUp });
};

export const getLessonGiveUps = async (
  req: AuthenticatedRequest<LessonSlugParams>,
  res: Response<GetLessonQuizzesGiveUpsResponse>,
) => {
  const userId = req.currentUser?.id as number;
  const giveUpsData = await meService.getLessonGiveUps(userId, req.params.slug);
  res.json({ giveUpsData });
};

export const getUserAchievements = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const userId = req.currentUser?.id as number;
  const achievements = await meService.getUserAchievements(userId);
  res.json({ achievements });
};
