import { AuthenticatedRequest } from "../types/index.js";
import { type Response } from "express";
import * as lessonService from "../services/lessonService.js";
import { AuthStatus, GetLessonResponse } from "@app/types";

export const getLesson = async (
  req: AuthenticatedRequest<{ lessonId: string }>,
  res: Response<
    GetLessonResponse & {
      authStatus: AuthStatus;
    }
  >,
) => {
  const currentUserId = req.currentUser?.id as number | undefined;
  const authStatus = req.authStatus;
  const { lessonId } = req.params;
  const numberLessonId = Number(lessonId);
  let lessonData: GetLessonResponse;
  if (currentUserId) {
    lessonData = await lessonService.getUserLesson(
      currentUserId,
      numberLessonId,
    );
  } else {
    lessonData = await lessonService.getGuestLesson(numberLessonId);
  }
  res.json({
    ...lessonData,
    authStatus: authStatus,
  });
};
