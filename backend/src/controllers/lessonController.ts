import { AuthenticatedRequest } from "../types/index.js";
import { type Response } from "express";
import * as lessonService from "../services/lessonService.js";

export const getAllLessons = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number;
  const lessons = await lessonService.getLessons({ userId: currentUserId });
  
  res.json({
    lessons: lessons,
  });
};

