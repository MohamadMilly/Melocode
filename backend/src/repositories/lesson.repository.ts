import { ExtendedPrismaClient } from "../lib/prisma.js";
import { prisma } from "../lib/prisma.js";

class LessonRepository {
  prisma: ExtendedPrismaClient;
  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  findLessonPath(lessonId: number) {
    return this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: {
        module: {
          select: { pathId: true },
        },
      },
    });
  }

  findLessonsForPath(pathId: number, userId?: number) {
    return this.prisma.lesson.findMany({
      where: { module: { pathId } },
      ...(userId === undefined
        ? {}
        : {
            include: {
              lessonProgresses: { where: { userId } },
            },
          }),
      orderBy: { createdAt: "asc" },
    });
  }
}

export const lessonRepository = new LessonRepository(prisma);
