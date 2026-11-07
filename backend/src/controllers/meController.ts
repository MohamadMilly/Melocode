import { AuthenticatedRequest } from "../types/index.js";
import { type Response } from "express";
import * as lessonService from "../services/lessonService.js";
import * as quizService from "../services/quizService.js";
import * as giveUpService from "../services/giveUpService.js";
import { prisma } from "../lib/prisma.js";
import * as achievementService from "../services/achievementService.js";
import {
  GetLessonQuizzesGiveUpsResponse,
  GetLessonQuizzesSubmissionsResponse,
  UserLessonProgress,
} from "@app/types";

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;

  const user = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
    include: {
      profile: true,
    },
  });
  res.json({ user });
};

export const createLessonProgress = async (
  req: AuthenticatedRequest<{ slug: string }>,
  res: Response<{ progress: UserLessonProgress }>,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { slug } = req.params;

  const progress = await lessonService.completeLesson({
    userId: currentUserId,
    slug: slug,
  });

  return res.json({
    progress,
  });
};

export const getLessonQuizzesSubmissions = async (
  req: AuthenticatedRequest<
    { slug: string },
    unknown,
    {},
    { isCorrect: "true" | "false" }
  >,
  res: Response<GetLessonQuizzesSubmissionsResponse>,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { slug } = req.params;

  const { isCorrect } = req.query;
  const parsedIsCorrect = isCorrect ? JSON.parse(isCorrect) : undefined;
  const quizzesUserSubmissions = await quizService.getUserLessonSubmissions(
    currentUserId,
    slug,
    parsedIsCorrect,
  );

  res.json({ submissionsData: quizzesUserSubmissions });
};

export const getQuizSubmissions = async (
  req: AuthenticatedRequest<{ external_quizId: string }>,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { external_quizId } = req.params;
  const submissions = await quizService.getUserQuizSubmissions(
    external_quizId,
    currentUserId,
  );

  res.json({ submissions });
};

export const giveUpToQuiz = async (
  req: AuthenticatedRequest<{ external_quizId: string }>,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { external_quizId } = req.params;
  const giveUp = await giveUpService.giveUpToQuiz(
    external_quizId,
    currentUserId,
  );

  return res.status(201).json({ giveUp });
};

export const getUserQuizGiveUp = async (
  req: AuthenticatedRequest<{ external_quizId: string }>,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { external_quizId } = req.params;
  const giveUp = await giveUpService.getUserQuizGiveUp(
    currentUserId,
    external_quizId,
  );

  return res.json({ giveUp });
};

export const getUserQuizzesGiveUpsForLesson = async (
  req: AuthenticatedRequest<{ slug: string }>,
  res: Response<GetLessonQuizzesGiveUpsResponse>,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { slug } = req.params;
  const giveUps = await giveUpService.getUserQuizzesGiveUpsForLesson(
    currentUserId,
    slug,
  );

  return res.json({ giveUpsData: giveUps });
};

export const getUserAchievements = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const achievements =
    await achievementService.getUserAchievements(currentUserId);

  res.json({
    achievements,
  });
};
