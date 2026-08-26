import { prisma } from "../lib/prisma.js";
import * as userService from "../services/userService.js";
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
export const getUsers = async (req, res) => {
    const { sortBy } = req.query;
    const users = await userService.getUsers(sortBy);
    res.json({ users: users });
};
