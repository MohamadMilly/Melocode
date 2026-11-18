import type {
  GetUserProgressResponse,
  GetUsersReponse,
  LeaderboardSortOrder,
} from "@app/types";
import type { Request, Response } from "express";
import type { GetUserProgressDto, GetUsersDto } from "./user.dto.js";
import { userService } from "./user.service.js";

export const getUserLessonProgresses = async (
  req: Request<{ userId: string }>,
  res: Response<GetUserProgressResponse>,
) => {
  const input: GetUserProgressDto = {
    userId: Number(req.params.userId),
  };
  const result = await userService.getUserLessonProgresses(input);
  res.json(result);
};

export const getUsers = async (
  req: Request<{}, unknown, {}, { sortBy?: LeaderboardSortOrder }>,
  res: Response<GetUsersReponse>,
) => {
  const input: GetUsersDto = {
    sortBy: req.query.sortBy ?? "-progress",
  };
  const users = await userService.getUsers(input);

  res.json({ users });
};
