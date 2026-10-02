import { Module } from "@app/types";
import { ExtendedPrismaClient, prisma } from "../lib/prisma.js";

class PathRepository {
  prisma: ExtendedPrismaClient;
  constructor(prisma: ExtendedPrismaClient) {
    this.prisma = prisma;
  }
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
        path: {
          slug: pathSlug,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      ...(includeLessons
        ? {
            include: {
              lessons: {
                orderBy: {
                  createdAt: "asc",
                },
                ...(userId
                  ? {
                      include: {
                        lessonProgresses: {
                          where: {
                            userId: userId,
                          },
                        },
                      },
                    }
                  : {}),
              },
            },
          }
        : {}),
    });
  }
}

export const pathRepository = new PathRepository(prisma); // here i have an extended prisma client , which results in a type error
// solution , infer the type of the extended one by "typeof" in prisma.ts , and import it here
