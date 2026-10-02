import { achievementRepository } from "../repositories/achievement.repository.js";

export async function getUserAchievements(userId: number) {
  return achievementRepository.findForUser(userId);
}
