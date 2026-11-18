import {
  ExtendedPrismaClient,
  prisma,
} from "../../infrastructure/lib/prisma.js";

class ProgressRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  createProgress(userId: number, slug: string) {
    return this.prisma.userLessonProgress.create({
      data: {
        user: { connect: { id: userId } },
        lesson: { connect: { slug } },
      },
    });
  }

  findProgress(userId: number, slug: string) {
    return this.prisma.userLessonProgress.findFirst({
      where: { userId, lesson: { slug } },
    });
  }

  findQuizAnswersWithUserCompletion(userId: number, slug: string) {
    return this.prisma.quizAnswer.findMany({
      where: { lesson: { slug } },
      include: {
        submissions: {
          where: { userId, isCorrect: true },
        },
        giveUps: { where: { userId } },
      },
    });
  }
}

export const progressRepository = new ProgressRepository(prisma);
