import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class AchievementRepository {
  prisma: ExtendedPrismaClient;

  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  findForUser(userId: number) {
    return this.prisma.achievement.findMany({ where: { userId } });
  }
}

export const achievementRepository = new AchievementRepository(prisma);
