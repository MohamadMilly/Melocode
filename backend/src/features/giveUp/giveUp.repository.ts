import {
  prisma,
  type ExtendedPrismaClient,
} from "../../infrastructure/lib/prisma.js";

class GiveUpRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  findCorrectSubmissionForUser(userId: number, quizAnswerId: number) {
    return this.prisma.quizSubmission.findUnique({
      where: {
        userId_quizAnswerId_isCorrect: {
          userId,
          quizAnswerId,
          isCorrect: true,
        },
      },
    });
  }

  createGiveUp(userId: number, quizAnswerId: number) {
    return this.prisma.quizGiveUp.create({
      data: { userId, quizAnswerId },
    });
  }
}

export const giveUpRepository = new GiveUpRepository(prisma);
