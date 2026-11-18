import type { Module } from "@app/types";
import {
  ExtendedPrismaClient,
  prisma,
} from "../../infrastructure/lib/prisma.js";

class PathRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {}

  findPaths() {
    return this.prisma.path.findMany();
  }

  findModulesForPath(
    pathSlug: string,
    includeLessons: boolean,
    userId?: number,
  ): Promise<Module[]> {
    return this.prisma.module.findMany({
      where: {
        path: { slug: pathSlug },
      },
      ...(includeLessons
        ? {
            include: {
              lessons: {
                orderBy: { order: "asc" },
                ...(userId
                  ? {
                      include: {
                        lessonProgresses: {
                          where: { userId },
                        },
                      },
                    }
                  : {}),
              },
            },
          }
        : {}),
      orderBy: { order: "asc" },
    });
  }
}

export const pathRepository = new PathRepository(prisma);
