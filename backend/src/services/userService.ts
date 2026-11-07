import { LeaderboardSortOrder, User } from "@app/types";
import { HttpError } from "../shared/errors/HttpError.js";
import {
  parseLeaderboardSortOrder,
  sortUsersByStreak,
  sortUsersBySubmissions,
} from "../domains/user.domain.js";
import { userRepository } from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import { UserNotFound } from "../shared/errors/UserNotFound.js";

export function createUserService(userRepository) {
  return {
    getUsers: async (sortedBy: LeaderboardSortOrder) => {
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
    },

    createUser: async ({ fullname, username, password }): Promise<User> => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return userRepository.createUser({
        fullname,
        username,
        hashedPassword,
      });
    },

    findUserByUsername: async (username: string) => {
      const user = await userRepository.findUserByUsername(username);
      if (!user) {
        throw new UserNotFound(username);
      }
      return user;
    },
  };
}

export const userService = createUserService(userRepository);
