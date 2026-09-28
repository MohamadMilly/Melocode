import { Module } from "@app/types";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { deriveLessonsStatuses } from "../shared/utils/deriveLessonsStatuses.js";

export const getAllPaths = async () => prisma.path.findMany();

export const getModulesForPath = async ({
  slug,
  includeLessons,
  userId,
}: {
  slug: string;
  includeLessons: boolean;
  userId?: number;
}): Promise<Module[]> => {
  if (!includeLessons) {
    return prisma.module.findMany({
      where: { path: { slug } },
      orderBy: { createdAt: "asc" },
    });
  }

  if (userId) {
    const modulesWithLessons = await prisma.module.findMany({
      where: { path: { slug } },
      orderBy: { createdAt: "asc" },
      include: {
        lessons: {
          orderBy: { createdAt: "asc" },
          include: {
            lessonProgresses: {
              where: { userId },
            },
          },
        },
      },
    });
    const lessons = modulesWithLessons.flatMap((module) => module.lessons);
    const lessonsWithStatuses = deriveLessonsStatuses(lessons);
    const lessonsWithStatusesMap = new Map(
      lessonsWithStatuses.map((lesson) => [lesson.id, lesson.status]),
    );
    return modulesWithLessons.map((module) => {
      return {
        ...module,
        lessons: module.lessons.map((lesson) => {
          return {
            ...lesson,
            status: lessonsWithStatusesMap.get(lesson.id),
          };
        }),
      };
    });
  } else {
    const modulesWithLessons = await prisma.module.findMany({
      where: { path: { slug } },
      orderBy: { createdAt: "asc" },
      include: {
        lessons: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
    let lessonIndex = 0;
    return modulesWithLessons.map((module) => {
      return {
        ...module,
        lessons: module.lessons.map((lesson) => {
          return {
            ...lesson,
            status: lessonIndex++ <= 9 ? "current" : "locked",
          };
        }),
      };
    });
  }
};
