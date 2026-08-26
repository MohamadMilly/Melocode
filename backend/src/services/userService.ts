import {
  ExtendedUser,
  LeaderboardSortOrder,
  LeaderBoardUser,
  SortDirection,
  SortMetric,
} from "@app/types";
import { UserFindManyArgs } from "../generated/prisma/models.js";
import { prisma } from "../lib/prisma.js";

const getUsersByStreak = async (
  options: UserFindManyArgs,
  direction: SortDirection,
) => {
  const usersWithOrderedStreaks = await prisma.user.findMany(options);
  return usersWithOrderedStreaks.sort((a: ExtendedUser, b: ExtendedUser) =>
    direction === "+" ? a.streak - b.streak : b.streak - a.streak,
  );
};

const getUsersByProgress = async (
  options: UserFindManyArgs,
  direction: SortDirection,
) => {
  const usersByProgress = await prisma.user.findMany({
    ...options,
    include: {
      _count: {
        select: {
          lessonProgresses: true,
        },
      },
    },
    orderBy: {
      lessonProgresses: {
        _count: direction === "+" ? "asc" : "desc",
      },
    },
  });

  return usersByProgress;
};

const getUsersBySubmissions = async (
  options: UserFindManyArgs,
  direction: SortDirection,
) => {
  const usersBySubmissions = await prisma.user.findMany({
    ...options,
    include: {
      _count: {
        select: {
          submissions: {
            where: {
              isCorrect: true,
            },
          },
        },
      },
    },
    orderBy: {
      submissions: {
        _count: direction === "+" ? "asc" : "desc",
      },
    },
  });

  return usersBySubmissions;
};

const getUsersHandlers: Record<
  SortMetric,
  (
    options: UserFindManyArgs,
    direction: SortDirection,
  ) => Promise<LeaderBoardUser[]>
> = {
  progress: getUsersByProgress,
  streak: getUsersByStreak,
  submissions: getUsersBySubmissions,
};

export const getUsers = async (sortedBy: LeaderboardSortOrder) => {
  const options: UserFindManyArgs = {
    include: {
      profile: true,
    },
  };
  const direction = sortedBy[0] as SortDirection;
  const metric = sortedBy.slice(1).trim().toLowerCase() as SortMetric;

  const handler = getUsersHandlers[metric];
  return handler(options, direction);
};

