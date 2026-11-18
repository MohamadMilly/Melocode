import { type Response } from "express";
import { matchedData } from "express-validator";
import { AuthenticatedRequest } from "../../shared/types/auth.types.js";
import * as lessonService from "./lesson.service.js";
import type { LessonResponseDto } from "@app/types";

export const getLesson = async (
  req: AuthenticatedRequest<{ slug: string }>,
  res: Response<LessonResponseDto>,
) => {
  const currentUserId = req.currentUser?.id;
  const authStatus = req.authStatus;
  const { slug } = matchedData<Record<string, string>>(req, {
    locations: ["params"],
  });

  const lessonData = currentUserId
    ? await lessonService.getUserLesson(currentUserId, slug)
    : await lessonService.getGuestLesson(slug);

  res.json({
    ...lessonData,
    authStatus,
    progress: currentUserId ? lessonData.progress : null,
  });
};
