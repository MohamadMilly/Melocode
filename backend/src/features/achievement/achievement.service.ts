import type { AchievementScope } from "@app/types";
import { socketService } from "../../infrastructure/realtime/socketService.js";
import { determineNextAchievement } from "./achievement.domain.js";
import { achievementRepository } from "./achievement.repository.js";

async function processAchievement(userId: number, scope: AchievementScope) {
  let achievement;

  try {
    const [achievementCount, lastAchievement] = await Promise.all([
      scope === "SUBMISSION"
        ? achievementRepository.countCorrectSubmissions(userId)
        : achievementRepository.countCompletedLessons(userId),
      achievementRepository.findLastAchievement(userId, scope),
    ]);

    const { isToCreate, nextFrequency } = determineNextAchievement(
      lastAchievement,
      achievementCount,
    );
    if (!isToCreate || !nextFrequency) {
      return;
    }

    const existingAchievement = await achievementRepository.findAchievement(
      userId,
      scope,
      nextFrequency,
    );
    if (existingAchievement) {
      return;
    }

    achievement = await achievementRepository.createAchievement(
      userId,
      scope,
      nextFrequency,
    );
  } catch (error) {
    console.error("Achievement processing failed:", error);
    socketService.sendError(
      "achievement_system",
      "UnExpected error happended while proccessing the achievement",
      userId,
    );
    return;
  }

  if (achievement) {
    socketService.sendAchievement(userId, achievement);
  }
}

export const processSubmissionAchievement = (userId: number) =>
  processAchievement(userId, "SUBMISSION");

export const processProgressAchievement = (userId: number) =>
  processAchievement(userId, "PROGRESS");
