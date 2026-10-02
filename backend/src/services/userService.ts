import { LeaderboardSortOrder } from "@app/types";
import { HttpError } from "../shared/errors/HttpError.js";
import {
  parseLeaderboardSortOrder,
  sortUsersByStreak,
  sortUsersBySubmissions,
} from "../domains/user.domain.js";
import { userRepository } from "../repositories/user.repository.js";

export const getUsers = async (sortedBy: LeaderboardSortOrder) => {
  const sortOrder = parseLeaderboardSortOrder(sortedBy);
  if (!sortOrder) {
    throw new HttpError(400, "Unknown query param.");
  }

  if (sortOrder.metric === "progress") {
    return userRepository.findUsersByProgress(sortOrder.direction);
  }
  if (sortOrder.metric === "streak") {
    const users = await userRepository.findUsersWithProfiles();
    return sortUsersByStreak(users, sortOrder.direction);
  }

  const users = await userRepository.findUsersWithCorrectSubmissionCounts();
  return sortUsersBySubmissions(users, sortOrder.direction);
};
