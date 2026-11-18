import {
  prisma,
  type ExtendedPrismaClient,
} from "../../infrastructure/lib/prisma.js";

export class MeRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  findCurrentUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  findAchievements(userId: number) {
    return this.prisma.achievement.findMany({
      where: { userId },
    });
  }
}

export const meRepository = new MeRepository(prisma);
