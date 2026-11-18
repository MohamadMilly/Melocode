import type { Module, UserType } from "@app/types";
import { giveModulesWithStatuses } from "../../shared/domains/lessonStatus.domain.js";
import { activeOrderRepository } from "../../shared/persistence/activeOrder.repository.js";
import { pathRepository } from "./path.repository.js";

type PathRepositoryType = typeof pathRepository;

export function createPathService(repository: PathRepositoryType) {
  return {
    getAllPaths: () => repository.findPaths(),

    getModulesForPath: async ({
      slug,
      includeLessons,
      userId,
    }: {
      slug: string;
      includeLessons: boolean;
      userId?: number;
    }): Promise<Module[]> => {
      const modules = await repository.findModulesForPath(
        slug,
        includeLessons,
        userId,
      );

      if (!includeLessons) {
        return modules;
      }

      let activeOrder: number | undefined;
      if (userId) {
        activeOrder = await activeOrderRepository.findActiveOrder(userId, {
          slug,
        });
      }

      const userType: UserType = userId ? "MEMBER" : "GUEST";
      return giveModulesWithStatuses(modules, userType, activeOrder);
    },
  };
}

export const pathService = createPathService(pathRepository);
