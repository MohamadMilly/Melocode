import { Module } from "@app/types";
import { prisma } from "../lib/prisma.js";
import { pathRepository } from "../repositories/path.repository.js";
import {
  giveGuestModulesWithStatuses,
  giveUserModulesWithStatuses,
} from "../domains/lesson.domain.js";

type PathRepositoryType = typeof pathRepository;

function createPathService(pathRepository: PathRepositoryType) {
  return {
    getAllPaths: () => pathRepository.findPaths(),
    getModulesForPath: async ({
      slug,
      includeLessons,
      userId,
    }: {
      slug: string;
      includeLessons: boolean;
      userId?: number;
    }): Promise<Module[]> => {
      const modules = await pathRepository.findModulesForPath(
        slug,
        includeLessons,
        userId,
      );
      
      if (!includeLessons) {
        return modules;
      }

      return userId
        ? giveUserModulesWithStatuses(modules)
        : giveGuestModulesWithStatuses(modules);
    },
  };
}

export const pathService = createPathService(pathRepository);
