import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { getStreak } from "../shared/utils/getStreak.js";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
export const basePrisma = new PrismaClient({ adapter });
export const prisma = basePrisma.$extends({
    result: {
        user: {
            streak: {
                needs: {},
                compute(user) {
                    return (user.streak ?? 0);
                },
            },
            submissionsCount: {
                needs: {},
                compute(user) {
                    return (user.submissionsCount ?? 0);
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
                const userArgs = (args || {});
                userArgs.include = {
                    ...userArgs.include,
                    lessonProgresses: true,
                };
                let result = await query(userArgs);
                const mapUserWithStreak = (record) => {
                    if (!record)
                        return record;
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
                    return result.map(mapUserWithStreak);
                }
                return mapUserWithStreak(result);
            },
            async findMany({ model, operation, args, query }) {
                args = { ...args, take: 100 };
                return query(args);
            },
        },
    },
});
