import type {
  GetUserProgressResponse,
  LeaderboardSortOrder,
  User,
} from "@app/types";
import { HttpError } from "../../shared/errors/HttpError.js";
import { UserNotFound } from "../../shared/errors/UserNotFound.js";
import {
  parseLeaderboardSortOrder,
  sortUsersByStreak,
  sortUsersBySubmissions,
} from "./user.domain.js";
import type { GetUserProgressDto, GetUsersDto } from "./user.dto.js";
import { userRepository, type UserRepository } from "./user.repository.js";

export function createUserService(repository: UserRepository) {
  return {
    getUsers: async ({ sortBy }: GetUsersDto) => {
      const sortOrder = parseLeaderboardSortOrder(sortBy);
      if (!sortOrder) {
        throw new HttpError(400, "Unknown query param.");
      }

      if (sortOrder.metric === "progress") {
        return repository.findUsersByProgress(sortOrder.direction);
      }
      if (sortOrder.metric === "streak") {
        const users = await repository.findUsersWithProfiles();
        return sortUsersByStreak(users, sortOrder.direction);
      }

      const users = await repository.findUsersWithCorrectSubmissionCounts();
      return sortUsersBySubmissions(users, sortOrder.direction);
    },

    getUserLessonProgresses: async ({
      userId,
    }: GetUserProgressDto): Promise<GetUserProgressResponse> => {
      const lessonsCount = await repository.findLessonCount();
      const progresses = await repository.findProgressesByUserId(userId);
      const progressFraction = progresses.length / lessonsCount;

      return { progresses, progressFraction };
    },

    findUserByUsername: async (username: string): Promise<User> => {
      const user = await repository.getUserByUsername(username);
      if (!user) {
        throw new UserNotFound(username);
      }
      return user;
    },
  };
}

export const userService = createUserService(userRepository);
