import {
  ExtendedPrismaClient,
  prisma,
} from "../../infrastructure/lib/prisma.js";
import { quizRepository } from "../../shared/persistence/quiz.repository.js";

class LessonRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  findLessonWithModuleAndPath(slug: string) {
    return this.prisma.lesson.findUnique({
      where: { slug },
      include: {
        module: {
          include: { path: true },
        },
      },
    });
  }

  findPreviousLesson(pathId: number, order: number) {
    return this.prisma.lesson.findFirst({
      where: {
        AND: [{ module: { pathId } }, { order: { lt: order } }],
      },
      orderBy: { order: "desc" },
    });
  }

  findNextLesson(pathId: number, order: number) {
    return this.prisma.lesson.findFirst({
      where: {
        AND: [{ module: { pathId } }, { order: { gt: order } }],
      },
      orderBy: { order: "asc" },
    });
  }

  findLessonWithModule(slug: string) {
    return this.prisma.lesson.findUnique({
      where: { slug },
      include: { module: true },
    });
  }

  findProgress(userId: number, slug: string) {
    return this.prisma.userLessonProgress.findFirst({
      where: { userId, lesson: { slug } },
    });
  }

  findQuizAnswersWithUserCompletion(userId: number, slug: string) {
    return quizRepository.findQuizAnswersWithUserCompletion(userId, slug);
  }
}

export const lessonRepository = new LessonRepository(prisma);
