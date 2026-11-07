import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class LessonProgressRepository {
  prisma: ExtendedPrismaClient;

  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  createProgress(userId: number, slug: string) {
    return this.prisma.userLessonProgress.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        lesson: {
          connect: {
            slug: slug,
          },
        },
      },
    });
  }

  findProgress(userId: number, slug: string) {
   
    return this.prisma.userLessonProgress.findFirst({
      where: {
        userId,
        lesson: { slug },
      },
    });
  }
}

export const lessonProgressRepository = new LessonProgressRepository(prisma);
