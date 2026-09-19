import { AuthenticatedRequest } from "../types/index.js";
import { type Response } from "express";
import * as lessonService from "../services/lessonService.js";
import { ExtendedLesson, GetLessonResponse } from "@app/types";

export const getAllLessons = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const currentUserId = req.currentUser?.id as number | undefined;
  let lessons: ExtendedLesson[]; // can be undefined ...
  if (currentUserId && req.authStatus === "Authorized") {
    lessons = await lessonService.getUserLessons({ userId: currentUserId });
  } else {
    lessons = await lessonService.getGuestLessons();
  }
  res.json({
    lessons: lessons,
    authStatus: req.authStatus,
  });
};

export const getLesson = async (
  req: AuthenticatedRequest<{ lessonId: string }>,
  res: Response<
    GetLessonResponse & {
      authStatus: "Authorized" | "UnAuthorized" | undefined;
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
