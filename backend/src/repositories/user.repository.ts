import { SortDirection } from "@app/types";
import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class UserRepository {
  prisma: ExtendedPrismaClient;

  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  findUsersWithProfiles() {
    return this.prisma.user.findMany({
      include: { profile: true },
    });
  }

  findUsersByProgress(direction: SortDirection) {
    return this.prisma.user.findMany({
      include: {
        _count: { select: { lessonProgresses: true } },
      },
      orderBy: {
        lessonProgresses: {
          _count: direction === "+" ? "asc" : "desc",
        },
      },
    });
  }

  findUsersWithCorrectSubmissionCounts() {
    return this.prisma.user.findMany({
      include: {
        _count: {
          select: {
            submissions: { where: { isCorrect: true } },
          },
        },
      },
    });
  }
}

export const userRepository = new UserRepository(prisma);
