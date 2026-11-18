import {
  prisma,
  type ExtendedPrismaClient,
} from "../../infrastructure/lib/prisma.js";

class TestCaseRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  findInputsForQuiz(quizAnswerId: number) {
    return this.prisma.testCase.findMany({
      where: { quizAnswerId },
      select: { id: true, input: true },
    });
  }
}

export const testCaseRepository = new TestCaseRepository(prisma);
