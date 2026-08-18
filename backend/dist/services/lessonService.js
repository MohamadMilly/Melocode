import { prisma } from "../lib/prisma.js";
import { HttpError } from "../shared/errors/HttpError.js";
export const getLessons = async ({ userId }) => {
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
    const lessonsWithStatus = [];
    for (let i = 0; i < lessons.length; i++) {
        const currentLesson = lessons[i];
        const previousLesson = lessons[i - 1];
        let status;
        if (currentLesson.lessonProgresses &&
            currentLesson.lessonProgresses.length === 1) {
            status = "completed";
        }
        else if (!previousLesson ||
            (previousLesson.lessonProgresses &&
                previousLesson.lessonProgresses.length === 1)) {
            status = "current";
        }
        else {
            status = "locked";
        }
        lessonsWithStatus.push({
            ...currentLesson,
            status: userId ? status : i === 0 ? "current" : "locked",
        });
    }
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
        const isCompletedAllQuizzes = quizzesAnswersWithSubmissionsAndGiveUps.every((quizAnswer) => quizAnswer.submissions.length >= 1 || quizAnswer.giveUps.length >= 1);
        if (!isCompletedAllQuizzes) {
            throw new HttpError(400, "You haven't finished all quizzes yet. Complete them or Give up and try again.");
        }
        await prisma.userLessonProgress.upsert({
            where: {
                lessonId_userId: {
                    userId,
                    lessonId,
                },
            },
            update: {},
            create: { userId, lessonId },
        });
        return true;
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
export const getLessonProgress = async (userId, lessonId) => {
    const progress = await prisma.userLessonProgress.findUnique({
        where: {
            lessonId_userId: {
                lessonId,
                userId,
            },
        },
    });
    const quizzesWithUserSubmissions = await prisma.quizAnswer.findMany({
        where: {
            lessonId: lessonId,
        },
        include: {
            submissions: {
                where: {
                    userId: userId,
                },
            },
            giveUps: {
                where: {
                    userId: userId,
                },
            },
        },
    });
    const hasCompletedAllQuizzes = quizzesWithUserSubmissions.every((quiz) => quiz.submissions.some((s) => s.isCorrect) || quiz.giveUps.length >= 1);
    return {
        hasCompletedAllQuizzes: hasCompletedAllQuizzes,
        progress: progress,
    };
};
