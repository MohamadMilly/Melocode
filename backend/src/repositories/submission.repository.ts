import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class SubmissionRepository {
  prisma: ExtendedPrismaClient;

  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  findCorrectSubmissionsForUser(userId: number, lessonId: number) {
    return this.prisma.quizSubmission.findMany({
      where: {
        userId,
        isCorrect: true,
        quizAnswer: {
          lessonId,
        },
      },
      select: {
        quizAnswerId: true,
      },
    });
  }

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

  findForUserAndQuiz(userId: number, quizAnswerId: number) {
    return this.prisma.quizSubmission.findMany({
      where: { userId, quizAnswerId },
    });
  }

  upsertSubmission(data: {
    content: string;
    language: string | null | undefined;
    userId: number;
    quizAnswerId: number;
    isCorrect: boolean;
  }) {
    return this.prisma.quizSubmission.upsert({
      where: {
        userId_quizAnswerId_isCorrect: {
          userId: data.userId,
          quizAnswerId: data.quizAnswerId,
          isCorrect: data.isCorrect,
        },
      },
      update: { content: data.content, language: data.language },
      create: data,
    });
  }
}

export const submissionRepository = new SubmissionRepository(prisma);
