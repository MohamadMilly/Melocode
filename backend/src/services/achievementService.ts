import { prisma } from "../lib/prisma.js";

export async function getUserAchievements(userId: number) {
  const achievements = await prisma.achievement.findMany({
    where: {
      userId: userId,
    },
  });

  return achievements;
}
