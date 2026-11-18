import {
  prisma,
  type ExtendedPrismaClient,
} from "../../infrastructure/lib/prisma.js";

class SubmissionRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  findGiveUpForUserAndQuiz(userId: number, quizAnswerId: number) {
    return this.prisma.quizGiveUp.findUnique({
      where: { userId_quizAnswerId: { userId, quizAnswerId } },
    });
  }

  findTestCasesForQuiz(quizAnswerId: number) {
    return this.prisma.testCase.findMany({ where: { quizAnswerId } });
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
