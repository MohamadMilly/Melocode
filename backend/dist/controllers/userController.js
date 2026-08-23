import { prisma } from "../lib/prisma.js";
export const getUserLessonProgresses = async (req, res) => {
    const { userId } = req.params;
    const numberUserId = Number(userId);
    const lessonsCount = await prisma.lesson.count();
    const progresses = await prisma.userLessonProgress.findMany({
        where: {
            userId: numberUserId,
        },
    });
    const progressFraction = progresses.length / lessonsCount;
    res.json({ progresses, progressFraction: progressFraction });
};
