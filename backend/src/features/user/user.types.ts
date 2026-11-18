import type { SortDirection, SortMetric } from "@app/types";

export interface ParsedLeaderboardSortOrder {
  direction: SortDirection;
  metric: SortMetric;
}
