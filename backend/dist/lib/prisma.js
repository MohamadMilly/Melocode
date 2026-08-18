import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { getStreak } from "../shared/utils/getStreak.js";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
export const basePrisma = new PrismaClient({ adapter });
export const prisma = basePrisma.$extends({
    query: {
        user: {
            async $allOperations({ operation, args, query }) {
                const userArgs = (args || {});
                if (["findMany", "findUnique", "findFirst"].includes(operation)) {
                    userArgs.include = { ...userArgs.include, lessonProgresses: true };
                }
                let result = (await query(args));
                if (Array.isArray(result)) {
                    result = result.map(({ lessonProgresses, ...user }) => {
                        return {
                            ...user,
                            streak: getStreak(lessonProgresses || []),
                        };
                    });
                }
                else if (result) {
                    const { lessonProgresses, ...resultWithoutProgresses } = result;
                    result = {
                        ...resultWithoutProgresses,
                        streak: getStreak(lessonProgresses || []),
                    };
                }
                return result;
            },
        },
    },
});
