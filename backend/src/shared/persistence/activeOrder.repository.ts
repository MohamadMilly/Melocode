import {
  ExtendedPrismaClient,
  prisma,
} from "../../infrastructure/lib/prisma.js";

class ActiveOrderRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  async findActiveOrder(
    userId: number,
    { pathId, slug }: { pathId?: number; slug?: string },
  ): Promise<number> {
    const currentLesson = await this.prisma.lesson.findFirst({
      where: {
        OR: [
          pathId ? { module: { pathId } } : undefined,
          slug ? { module: { path: { slug } } } : undefined,
        ].filter(Boolean),
        lessonProgresses: {
          none: { userId },
        },
      },
      orderBy: { order: "asc" },
    });

    return currentLesson?.order ?? Infinity;
  }
}

export const activeOrderRepository = new ActiveOrderRepository(prisma);
