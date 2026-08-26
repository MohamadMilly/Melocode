import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { getStreak } from "../shared/utils/getStreak.js";

import { Args, Result } from "@prisma/client/runtime/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const basePrisma = new PrismaClient({ adapter });

export const prisma = basePrisma.$extends({
  result: {
    user: {
      streak: {
        needs: {},
        compute(user: any) {
          return (user.streak ?? 0) as number;
        },
      },
    },
  },
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        if (!["findMany", "findUnique", "findFirst"].includes(operation)) {
          return query(args);
        }

        const userArgs = (args || {}) as Args<
          typeof basePrisma.user,
          "findMany"
        >;

        userArgs.include = {
          ...userArgs.include,
          lessonProgresses: true,
        };

        let result = await query(userArgs);

        const mapUserWithStreak = (record: any) => {
          if (!record) return record;
          const { lessonProgresses, _count, ...user } = record;
          return {
            ...user,
            lessonProgresses: lessonProgresses,
            streak: getStreak(lessonProgresses || []),
            ...(_count
              ? {
                  [`${Object.keys(_count)}Count`]: Object.values(_count)[0],
                }
              : {}),
          };
        };

        if (Array.isArray(result)) {
          return result.map(mapUserWithStreak) as Result<
            typeof basePrisma.user,
            typeof userArgs,
            "findMany"
          >;
        }

        return mapUserWithStreak(result) as Result<
          typeof basePrisma.user,
          typeof userArgs,
          "findFirst"
        >;
      },
      async findMany({ model, operation, args, query }) {
        args = { ...args, take: 100 };
        return query(args);
      },
    },
  },
});
