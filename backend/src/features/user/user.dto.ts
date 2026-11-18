import type { LeaderboardSortOrder } from "@app/types";

export interface GetUsersDto {
  sortBy: LeaderboardSortOrder;
}

export interface GetUserProgressDto {
  userId: number;
}
