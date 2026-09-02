import { prisma } from "../lib/prisma.js";
export async function getUserAchievements(userId) {
    const achievements = await prisma.achievement.findMany({
        where: {
            userId: userId,
        },
    });
    return achievements;
}
