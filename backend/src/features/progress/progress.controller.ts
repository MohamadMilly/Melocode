import { type Response } from "express";
import { AuthenticatedRequest } from "../../shared/types/auth.types.js";
import type { CreateProgressResponseDto } from "@app/types";
import * as progressService from "./progress.service.js";

export const createProgress = async (
  req: AuthenticatedRequest<{ slug: string }>,
  res: Response<CreateProgressResponseDto>,
) => {
  const currentUserId = req.currentUser?.id as number;
  const { slug } = req.params;
  const progress = await progressService.completeLesson({
    userId: currentUserId,
    slug,
  });

  return res.json({ progress });
};
