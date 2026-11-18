import type { Achievement, AchievementFrequency } from "@app/types";
import {
  convertFrequency,
  frequencyToNumber,
} from "./achievement.constants.js";

export function determineNextAchievement(
  lastAchievement: Achievement | null | undefined,
  achievementCount: number,
): { isToCreate: boolean; nextFrequency?: AchievementFrequency } {
  const currentFrequency = lastAchievement
    ? frequencyToNumber[lastAchievement.frequency]
    : 1;

  const isToCreate =
    !lastAchievement || achievementCount / currentFrequency >= 10;
  if (!isToCreate) {
    return { isToCreate: false };
  }

  const nextFrequency = (
    !lastAchievement
      ? "ONE"
      : convertFrequency(currentFrequency * 10)
  ) as AchievementFrequency;

  return { isToCreate: true, nextFrequency };
}
