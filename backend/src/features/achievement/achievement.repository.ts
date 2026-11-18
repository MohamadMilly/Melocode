import type { AchievementFrequency, AchievementScope } from "@app/types";
import {
  prisma,
  type ExtendedPrismaClient,
} from "../../infrastructure/lib/prisma.js";

export class AchievementRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  countCorrectSubmissions(userId: number) {
    return this.prisma.quizSubmission.count({
      where: { userId, isCorrect: true },
    });
  }

  countCompletedLessons(userId: number) {
    return this.prisma.userLessonProgress.count({ where: { userId } });
  }

  findLastAchievement(userId: number, scope: AchievementScope) {
    return this.prisma.achievement.findFirst({
      where: { userId, scope },
      orderBy: { frequency: "desc" },
    });
  }

  findAchievement(
    userId: number,
    scope: AchievementScope,
    frequency: AchievementFrequency,
  ) {
    return this.prisma.achievement.findUnique({
      where: {
        scope_frequency_userId: { userId, scope, frequency },
      },
    });
  }

  createAchievement(
    userId: number,
    scope: AchievementScope,
    frequency: AchievementFrequency,
  ) {
    return this.prisma.achievement.create({
      data: { userId, scope, frequency },
    });
  }
}

export const achievementRepository = new AchievementRepository(prisma);
