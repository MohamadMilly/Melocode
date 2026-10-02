import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class TestCaseRepository {
  prisma: ExtendedPrismaClient;

  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  findForQuiz(quizAnswerId: number) {
    return this.prisma.testCase.findMany({ where: { quizAnswerId } });
  }

  findInputsForQuiz(quizAnswerId: number) {
    return this.prisma.testCase.findMany({
      where: { quizAnswerId },
      select: { id: true, input: true },
    });
  }
}

export const testCaseRepository = new TestCaseRepository(prisma);
