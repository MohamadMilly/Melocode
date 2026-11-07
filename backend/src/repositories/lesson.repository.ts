import { Lesson } from "@app/types";
import { ExtendedPrismaClient } from "../lib/prisma.js";
import { prisma } from "../lib/prisma.js";

class LessonRepository {
  prisma: ExtendedPrismaClient;
  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }

  async findLessonWithModuleAndPath(slug: string) {
    return this.prisma.lesson.findUnique({
      where: {
        slug,
      },
      include: {
        module: {
          include: {
            path: true,
          },
        },
      },
    });
  }
  async findPreviousLesson(pathId, order) {
    return this.prisma.lesson.findFirst({
      where: {
        AND: [
          {
            module: {
              pathId,
            },
          },
          {
            order: {
              lt: order,
            },
          },
        ],
      },
      orderBy: {
        order: "desc",
      },
    });
  }
  async findNextLesson(pathId, order) {
    return this.prisma.lesson.findFirst({
      where: {
        AND: [
          {
            module: {
              pathId,
            },
          },
          {
            order: {
              gt: order,
            },
          },
        ],
      },
      orderBy: {
        order: "asc",
      },
    });
  }
  findLessonWithModuleAndPathAndProgress(slug: string, userId: number) {
    return this.prisma.lesson.findUnique({
      where: { slug },
      include: {
        module: { include: { path: true } },
        lessonProgresses: { where: { userId } },
      },
    });
  }

  findLessonWithModule(slug: string) {
    return this.prisma.lesson.findUnique({
      where: {
        slug: slug,
      },
      include: {
        module: true,
      },
    });
  }

  findPreviousLessonWithProgress(lesson, userId: number) {
    return this.prisma.lesson.findFirst({
      where: {
        module: { pathId: lesson.module.pathId },
        order: { lt: lesson.order },
      },
      include: {
        module: true,
        lessonProgresses: { where: { userId } },
      },
      orderBy: { order: "desc" },
    });
  }

  findNextLessonWithProgress(lesson, userId: number) {
    return this.prisma.lesson.findFirst({
      where: {
        module: { pathId: lesson.module.pathId },
        order: { gt: lesson.order },
      },
      include: {
        module: true,
        lessonProgresses: { where: { userId } },
      },
      orderBy: { order: "asc" },
    });
  }

  findLessonsForPath(pathId: number, userId?: number) {
    return this.prisma.lesson.findMany({
      where: { module: { pathId } },
      ...(userId === undefined
        ? {}
        : {
            include: {
              lessonProgresses: { where: { userId } },
            },
          }),
      orderBy: { createdAt: "asc" },
    });
  }

  async findActiveOrder(
    userId,
    { pathId, slug }: { pathId?: number; slug?: string },
  ) {
    const currentLesson = await this.prisma.lesson.findFirst({
      where: {
        /* when prisma reads pathId: undefiend , it matches everything ,
         that reasons why different paths collided with each other in the query */
        OR: [
          pathId ? { module: { pathId: pathId } } : undefined,
          slug ? { module: { path: { slug: slug } } } : undefined,
        ].filter(Boolean),
        lessonProgresses: {
          none: {
            userId: userId,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });
    if (!currentLesson) {
      return Infinity;
    }
    return currentLesson.order;
  }
}

export const lessonRepository = new LessonRepository(prisma);

/* 
TODO :
to find the previos lesson we need to find the lesson whose order is less than 
a specific order as a parameter , now we need to find the lessons whose order is less than that order
then to order them deceding by the order and acending by the module , this is an example:

0 [
0
1
2
]
1 [
0
1
]

[
0 , module 0
0 , module 1
1 , module 0
1 , module 1

1 module 0
0 module 0
1 module 1 
0 module 1


0
1
2
0
1
]

TODO : 
we need to find the next lesson in a specific path so we need to find the lesson whose order is greater than the order we get
as a parameter , we need to order by module acending and also by lesson acending

 0 [
 0
 1
 2
 3
 4 
 ]
 
 1 [
 0
 1
 2
 3
 ]
 
 3 module 0
 3 module 1
 4 module 0
  
 3 module 0
 4 module 0
 3 module module 1

 
*/
