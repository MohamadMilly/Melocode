import { Module, UserType } from "@app/types";
import { pathRepository } from "../repositories/path.repository.js";
import * as lessonDomain from "../domains/lesson.domain.js";
import { lessonRepository } from "../repositories/lesson.repository.js";

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
      let activeOrder: number | undefined = undefined;
      if (userId) {
        activeOrder = await lessonRepository.findActiveOrder(userId, { slug });
      }
      const userType: UserType = !!userId ? "MEMBER" : "GUEST";
      return lessonDomain.giveModulesWithStatuses(
        modules,
        userType,
        activeOrder,
      );
    },
  };
}

export const pathService = createPathService(pathRepository);
