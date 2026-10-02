import {
  ExtendedUser,
  LeaderBoardUser,
  LeaderboardSortOrder,
  SortDirection,
} from "@app/types";
import type { ParsedLeaderboardSortOrder } from "../types/index.js";

export const parseLeaderboardSortOrder = (
  value: LeaderboardSortOrder,
): ParsedLeaderboardSortOrder | null => {
  const direction = value[0];
  const metric = value.slice(1).trim().toLowerCase();
   
  if (
    (direction !== "+" && direction !== "-") ||
    (metric !== "progress" && metric !== "streak" && metric !== "submissions")
  ) {
    return null;
  }

  return { direction, metric };
};

export const sortUsersByStreak = <T extends ExtendedUser>(
  users: T[],
  direction: SortDirection,
): T[] =>
  users.sort((left, right) =>
    direction === "+" ? left.streak - right.streak : right.streak - left.streak,
  );

export const sortUsersBySubmissions = <T extends LeaderBoardUser>(
  users: T[],
  direction: SortDirection,
): T[] => {
  const multiplier = direction === "+" ? 1 : -1;
  return users.sort(
    (left, right) =>
      ((left.submissionsCount ?? 0) - (right.submissionsCount ?? 0)) *
      multiplier,
  );
};

