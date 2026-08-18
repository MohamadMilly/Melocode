import { AuthenticatedRequest } from "../types/index.js";
import { type Response } from "express";
import * as lessonService from "../services/lessonService.js";
import * as quizService from "../services/quizService.js";
import { prisma } from "../lib/prisma.js";

export const createLessonProgress = async (
  req: AuthenticatedRequest<{ lessonId: string }>,
  res: Response<{ hasCompleted: boolean }>,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { lessonId } = req.params;

  const hasCompleted = await lessonService.completeLesson({
    userId: currentUserId,
    lessonId: Number(lessonId),
  });

  return res.json({
    hasCompleted: hasCompleted,
  });
};

export const getLessonQuizzesSubmissions = async (
  req: AuthenticatedRequest<
    { lessonId: string },
    unknown,
    {},
    { isCorrect: "true" | "false" }
  >,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { lessonId } = req.params;
  const lessonIdNumber = Number(lessonId);
  const { isCorrect } = req.query;
  const parsedIsCorrect = isCorrect ? JSON.parse(isCorrect) : undefined;
  const quizzesUserSubmissions = await quizService.getUserLessonSubmissions(
    currentUserId,
    lessonIdNumber,
    parsedIsCorrect,
  );

  res.json({ submissionsData: quizzesUserSubmissions });
};

export const getQuizSubmissions = async (
  req: AuthenticatedRequest<{ quizAnswerId: number }>,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { quizAnswerId } = req.params;
  const quizAnswerIdNumber = Number(quizAnswerId);
  const submissions = await quizService.getUserQuizSubmissions(
    quizAnswerIdNumber,
    currentUserId,
  );

  res.json({ submissions: submissions });
};

export const getLessonProgress = async (
  req: AuthenticatedRequest<{ lessonId: string }>,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { lessonId } = req.params;
  const numberLessonId = Number(lessonId);
  const progressData = await lessonService.getLessonProgress(
    currentUserId,
    numberLessonId,
  );

  res.json({
    hasCompletedAllQuizzes: progressData.hasCompletedAllQuizzes,
    progress: progressData.progress,
  });
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;

  const user = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
  });
  res.json({ user });
};
