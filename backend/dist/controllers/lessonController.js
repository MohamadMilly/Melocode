import * as lessonService from "../services/lessonService.js";
import { prisma } from "../lib/prisma.js";
export const getAllLessons = async (req, res) => {
    const currentUserId = req.currentUser?.id; // can be undefined ...
    let lessons = [];
    if (currentUserId && req.authStatus === "Authorized") {
        lessons = await lessonService.getUserLessons({ userId: currentUserId });
    }
    else {
        lessons = (await prisma.lesson.findMany()).map((lesson, index) => index === 0
            ? { ...lesson, status: "current" }
            : { ...lesson, status: "locked" });
    }
    res.json({
        lessons: lessons,
        authStatus: req.authStatus,
    });
};
export const getLesson = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const authStatus = req.authStatus;
    const { lessonId } = req.params;
    const numberLessonId = Number(lessonId);
    let lessonData;
    if (currentUserId) {
        lessonData = await lessonService.getUserLesson(currentUserId, numberLessonId);
    }
    else {
        lessonData = await lessonService.getGuestLesson(numberLessonId);
    }
    res.json({
        ...lessonData,
        authStatus: authStatus,
    });
};
