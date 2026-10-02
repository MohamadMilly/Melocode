import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class LessonProgressRepository {
  prisma: ExtendedPrismaClient;

  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  createProgress(userId: number, lessonId: number) {
    return this.prisma.userLessonProgress.create({
      data: {
        userId,
        lessonId,
      },
    });
  }
}

export const lessonProgressRepository = new LessonProgressRepository(prisma);