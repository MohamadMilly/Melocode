import type { SortDirection } from "@app/types";
import {
  prisma,
  type ExtendedPrismaClient,
} from "../../infrastructure/lib/prisma.js";

export class UserRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

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

  findLessonCount() {
    return this.prisma.lesson.count();
  }

  findProgressesByUserId(userId: number) {
    return this.prisma.userLessonProgress.findMany({
      where: { userId },
    });
  }

  getUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}

export const userRepository = new UserRepository(prisma);
