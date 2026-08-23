import { GetUserProgressResponse } from "@app/types";
import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";

export const getUserLessonProgresses = async (
  req: Request<{ userId: string }>,
  res: Response<GetUserProgressResponse>,
) => {
  const { userId } = req.params;
  const numberUserId = Number(userId);
  const lessonsCount = await prisma.lesson.count();
  const progresses = await prisma.userLessonProgress.findMany({
    where: {
      userId: numberUserId,
    },
  });
  const progressFraction = progresses.length / lessonsCount;
  res.json({ progresses, progressFraction: progressFraction });
};
