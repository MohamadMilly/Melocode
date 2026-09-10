import { prisma } from "../lib/prisma.js";
import { determineNextAchievement } from "../shared/utils/determineNextAchievement.js";
import { HttpError } from "../shared/errors/HttpError.js";
import { socketService } from "../realtime/socketService.js";
export async function handleSubmissionAchievement({ userId, }) {
    let error = null;
    let achievement = null;
    try {
        const correctSubmissionsCount = await prisma.quizSubmission.count({
            where: {
                userId: userId,
                isCorrect: true,
            },
        });
        const [lastSubmissionAchievement] = await prisma.achievement.findMany({
            where: {
                userId: userId,
                scope: "SUBMISSION",
            },
            orderBy: {
                frequency: "desc",
            },
            take: 1,
        });
        const { isToCreate, nextFrequency } = determineNextAchievement(lastSubmissionAchievement, correctSubmissionsCount);
        if (!isToCreate || !nextFrequency)
            return;
        achievement = await prisma.achievement.create({
            data: {
                frequency: nextFrequency,
                scope: "SUBMISSION",
                userId: userId,
            },
        });
    }
    catch (err) {
        console.error("Achievement processing failed:", err);
        if (err.code === "P2009" || err.code === "P2020") {
            error = new HttpError(400, "Not in enum frequency values");
        }
        else if (err.code === "P2002") {
            error = new HttpError(400, "Achievement already exists");
        }
        else
            error = new HttpError(500, "UnExpected error happended while proccessing the achievement");
    }
    finally {
        if (error) {
            socketService.sendError("achievement_system", error.message, userId);
        }
        if (achievement) {
            socketService.sendAchievement(userId, achievement);
        }
    }
}
export async function handleProgressAchievement({ userId, }) {
    let error = null;
    let achievement = null;
    try {
        const lessonsProgressesCount = await prisma.userLessonProgress.count({
            where: {
                userId: userId,
            },
        });
        const [lastProgressAchievement] = await prisma.achievement.findMany({
            where: {
                userId: userId,
                scope: "PROGRESS",
            },
            orderBy: {
                frequency: "desc",
            },
            take: 1,
        });
        const { isToCreate, nextFrequency } = determineNextAchievement(lastProgressAchievement, lessonsProgressesCount);
        if (!isToCreate || !nextFrequency)
            return;
        achievement = await prisma.achievement.create({
            data: {
                scope: "PROGRESS",
                frequency: nextFrequency,
                userId,
            },
        });
    }
    catch (err) {
        console.error("Achievement processing failed:", err);
        if (err.code === "P2009" || err.code === "P2020") {
            error = new HttpError(400, "Not in enum frequency values");
        }
        else if (err.code === "P2002") {
            error = new HttpError(400, "Achievement already exists");
        }
        else {
            error = new HttpError(500, "UnExpected error happended while proccessing the achievement");
        }
    }
    finally {
        if (error) {
            socketService.sendError("achievement_system", error.message, userId);
        }
        if (achievement) {
            socketService.sendAchievement(userId, achievement);
        }
    }
}
