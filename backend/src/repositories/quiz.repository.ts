import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class QuizRepository {
  prisma: ExtendedPrismaClient;
  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  findQuizAnswersWithUserCompletion(userId: number, lessonId: number) {
    return this.prisma.quizAnswer.findMany({
      where: {
        lessonId,
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

  findQuizAnswerWithUserState(answerId: number, userId: number) {
    return this.prisma.quizAnswer.findUnique({
      where: { id: answerId },
      include: {
        items: true,
        giveUps: { where: { userId } },
        submissions: { where: { userId, isCorrect: true } },
      },
    });
  }

  findLessonSubmissions(userId: number, lessonId: number, isCorrect?: boolean) {
    return this.prisma.quizAnswer.findMany({
      where: { lessonId },
      select: {
        id: true,
        submissions: { where: { userId, isCorrect } },
      },
    });
  }

  findLessonGiveUps(userId: number, lessonId: number) {
    return this.prisma.quizAnswer.findMany({
      where: { lessonId },
      select: {
        id: true,
        giveUps: { where: { userId } },
      },
    });
  }
}

export const quizRepository = new QuizRepository(prisma);
