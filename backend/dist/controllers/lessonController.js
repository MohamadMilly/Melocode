import * as lessonService from "../services/lessonService.js";
export const getAllLessons = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const lessons = await lessonService.getLessons({ userId: currentUserId });
    res.json({
        lessons: lessons,
        authStatus: req.authStatus,
    });
};
