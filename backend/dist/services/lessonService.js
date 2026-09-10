import { prisma } from "../lib/prisma.js";
import { HttpError } from "../shared/errors/HttpError.js";
import { eventEmitter } from "../lib/eventEmitter.js";
import { hasCompletedAllQuizzes } from "../shared/utils/hasCompletedAllQuizzes.js";
import { deriveLessonsStatuses } from "../shared/utils/deriveLessonsStatuses.js";
import { extractLessonWithNeighbors } from "../shared/utils/extractLessonWithNeighbors.js";
export const getUserLessons = async ({ userId, }) => {
    const lessons = await prisma.lesson.findMany({
        include: {
            ...(userId
                ? {
                    lessonProgresses: {
                        where: {
                            userId: userId,
                        },
                        orderBy: {
                            completedAt: "asc",
                        },
                    },
                }
                : {}),
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    const lessonsWithStatus = deriveLessonsStatuses(lessons);
    return lessonsWithStatus;
};
export const completeLesson = async ({ userId, lessonId, }) => {
    try {
        const quizzesAnswersWithSubmissionsAndGiveUps = await prisma.quizAnswer.findMany({
            where: {
                lessonId: lessonId,
            },
            select: {
                id: true,
                lessonId: true,
                submissions: {
                    where: {
                        userId: userId,
                        isCorrect: true,
                    },
                },
                giveUps: {
                    where: {
                        userId: userId,
                    },
                },
            },
        });
        const result = hasCompletedAllQuizzes(quizzesAnswersWithSubmissionsAndGiveUps);
        if (!result) {
            throw new HttpError(400, "You haven't finished all quizzes yet. Complete them or Give up and try again.");
        }
        const progress = await prisma.userLessonProgress.create({
            data: { userId, lessonId },
        });
        eventEmitter.emit("lesson-completed", { userId: userId });
        return progress;
    }
    catch (err) {
        if (err?.code === "P2002") {
            throw new HttpError(400, "This lesson has already been completed.");
        }
        else {
            throw err;
        }
    }
};
export const getUserLesson = async (userId, lessonId) => {
    const allLessons = await prisma.lesson.findMany({
        include: {
            lessonProgresses: {
                where: {
                    userId: userId,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    const allLessonsWithStatuses = deriveLessonsStatuses(allLessons);
    const lessonWithNeighbors = extractLessonWithNeighbors(allLessonsWithStatuses, lessonId);
    const quizzesWithUserSubmissions = await prisma.quizAnswer.findMany({
        where: { lessonId: lessonId },
        include: {
            submissions: { where: { userId: userId, isCorrect: true } },
            giveUps: { where: { userId: userId } },
        },
    });
    const result = hasCompletedAllQuizzes(quizzesWithUserSubmissions);
    return {
        hasCompletedAllQuizzes: result,
        ...lessonWithNeighbors,
    };
};
export const getGuestLessons = async () => {
    return (await prisma.lesson.findMany({
        orderBy: {
            createdAt: "asc",
        },
    })).map((lesson, index) => index === 0
        ? { ...lesson, status: "current" }
        : { ...lesson, status: "locked" });
};
export const getGuestLesson = async (lessonId) => {
    const lessons = await getGuestLessons();
    const lessonWithNeighbors = extractLessonWithNeighbors(lessons, lessonId);
    return { ...lessonWithNeighbors, hasCompletedAllQuizzes: false };
};
