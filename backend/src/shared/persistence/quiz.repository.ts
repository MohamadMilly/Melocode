import {
  prisma,
  type ExtendedPrismaClient,
} from "../../infrastructure/lib/prisma.js";

class QuizRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  findQuizAnswersWithUserCompletion(userId: number, slug: string) {
    return this.prisma.quizAnswer.findMany({
      where: {
        lesson: {
          slug,
        },
      },
      include: {
        submissions: {
          where: {
            userId,
            isCorrect: true,
          },
        },
        giveUps: {
          where: {
            userId,
          },
        },
      },
    });
  }

  findQuizAnswerWithUserState(external_quizId: string, userId: number) {
    return this.prisma.quizAnswer.findUnique({
      where: { external_quizId },
      include: {
        items: true,
        giveUps: { where: { userId } },
        submissions: { where: { userId, isCorrect: true } },
      },
    });
  }

  findQuizAnswerByExternalId(external_quizId: string) {
    return this.prisma.quizAnswer.findUnique({
      where: { external_quizId },
      select: { id: true, external_quizId: true },
    });
  }

  findQuizByExternalId(external_quizId: string) {
    return this.prisma.quizAnswer.findUnique({
      where: { external_quizId },
      select: { id: true },
    });
  }

  findLessonSubmissions(userId: number, slug: string, isCorrect?: boolean) {
    return this.prisma.quizAnswer.findMany({
      where: {
        lesson: {
          slug,
        },
      },
      select: {
        external_quizId: true,
        submissions: { where: { userId, isCorrect } },
      },
    });
  }

  findLessonGiveUps(userId: number, slug: string) {
    return this.prisma.quizAnswer.findMany({
      where: {
        lesson: {
          slug,
        },
      },
      select: {
        external_quizId: true,
        giveUps: { where: { userId } },
      },
    });
  }

  findQuizSubmissions(userId: number, quizAnswerId: number) {
    return this.prisma.quizSubmission.findMany({
      where: { userId, quizAnswerId },
    });
  }

  findQuizGiveUp(userId: number, quizAnswerId: number) {
    return this.prisma.quizGiveUp.findUnique({
      where: { userId_quizAnswerId: { userId, quizAnswerId } },
    });
  }
}

export const quizRepository = new QuizRepository(prisma);
