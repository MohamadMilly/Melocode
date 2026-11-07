import { AuthenticatedRequest } from "../types/index.js";
import { type Response } from "express";
import * as lessonService from "../services/lessonService.js";
import { AuthStatus, GetLessonResponse } from "@app/types";
import { matchedData } from "express-validator";

export const getLesson = async (
  req: AuthenticatedRequest<{ slug: string }>,
  res: Response<
    GetLessonResponse & {
      authStatus: AuthStatus;
    }
  >,
) => {
  const currentUserId = req.currentUser?.id;
  const authStatus = req.authStatus;
  const { slug } = matchedData<Record<string, string>>(req, {
    locations: ["params"],
  });

  let lessonData;
  if (currentUserId) {
    lessonData = await lessonService.getUserLesson(currentUserId, slug);
  } else {
    lessonData = await lessonService.getGuestLesson(slug);
  }
  res.json({
    ...lessonData,
    authStatus: authStatus,
    progress: currentUserId ? lessonData.progress : null,
  });
};
