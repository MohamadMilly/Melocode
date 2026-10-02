import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class GiveUpRepository {
  prisma: ExtendedPrismaClient;

  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  findGiveUpsForUser(userId: number, lessonId: number) {
    return this.prisma.quizGiveUp.findMany({
      where: {
        userId,
        quizAnswer: {
          lessonId,
        },
      },
      select: {
        quizAnswerId: true,
      },
    });
  }

  findForUserAndQuiz(userId: number, quizAnswerId: number) {
    return this.prisma.quizGiveUp.findUnique({
      where: { userId_quizAnswerId: { userId, quizAnswerId } },
    });
  }

  createGiveUp(userId: number, quizAnswerId: number) {
    return this.prisma.quizGiveUp.create({
      data: { userId, quizAnswerId },
    });
  }
}

export const giveUpRepository = new GiveUpRepository(prisma);
