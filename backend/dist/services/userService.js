import { prisma } from "../lib/prisma.js";
const getUsersByStreak = async (options, direction) => {
    const usersWithOrderedStreaks = await prisma.user.findMany(options);
    return usersWithOrderedStreaks.sort((a, b) => direction === "+" ? a.streak - b.streak : b.streak - a.streak);
};
const getUsersByProgress = async (options, direction) => {
    const usersByProgress = await prisma.user.findMany({
        ...options,
        include: {
            _count: {
                select: {
                    lessonProgresses: true,
                },
            },
        },
        orderBy: {
            lessonProgresses: {
                _count: direction === "+" ? "asc" : "desc",
            },
        },
    });
    return usersByProgress;
};
const getUsersBySubmissions = async (options, direction) => {
    const usersBySubmissions = await prisma.user.findMany({
        ...options,
        include: {
            _count: {
                select: {
                    submissions: {
                        where: {
                            isCorrect: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            submissions: {
                _count: direction === "+" ? "asc" : "desc",
            },
        },
    });
    return usersBySubmissions;
};
const getUsersHandlers = {
    progress: getUsersByProgress,
    streak: getUsersByStreak,
    submissions: getUsersBySubmissions,
};
export const getUsers = async (sortedBy) => {
    const options = {
        include: {
            profile: true,
        },
    };
    const direction = sortedBy[0];
    const metric = sortedBy.slice(1).trim().toLowerCase();
    const handler = getUsersHandlers[metric];
    return handler(options, direction);
};
