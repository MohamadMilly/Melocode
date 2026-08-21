import * as lessonService from "../services/lessonService.js";
import * as quizService from "../services/quizService.js";
import * as giveUpService from "../services/giveUpService.js";
import { prisma } from "../lib/prisma.js";
export const createLessonProgress = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { lessonId } = req.params;
    const hasCompleted = await lessonService.completeLesson({
        userId: currentUserId,
        lessonId: Number(lessonId),
    });
    return res.json({
        hasCompleted: hasCompleted,
    });
};
export const getLessonQuizzesSubmissions = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { lessonId } = req.params;
    const lessonIdNumber = Number(lessonId);
    const { isCorrect } = req.query;
    const parsedIsCorrect = isCorrect ? JSON.parse(isCorrect) : undefined;
    const quizzesUserSubmissions = await quizService.getUserLessonSubmissions(currentUserId, lessonIdNumber, parsedIsCorrect);
    res.json({ submissionsData: quizzesUserSubmissions });
};
export const getQuizSubmissions = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { quizAnswerId } = req.params;
    const quizAnswerIdNumber = Number(quizAnswerId);
    const submissions = await quizService.getUserQuizSubmissions(quizAnswerIdNumber, currentUserId);
    res.json({ submissions: submissions });
};
export const giveUpToQuiz = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { quizAnswerId } = req.params;
    const giveUp = await giveUpService.giveUpToQuiz(Number(quizAnswerId), currentUserId);
    return res.status(201).json({ giveUp });
};
export const getUserQuizGiveUp = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { quizAnswerId } = req.params;
    const giveUp = await giveUpService.getUserQuizGiveUp(currentUserId, Number(quizAnswerId));
    return res.json({ giveUp });
};
export const getUserQuizzesGiveUpsForLesson = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { lessonId } = req.params;
    const giveUps = await giveUpService.getUserQuizzesGiveUpsForLesson(currentUserId, Number(lessonId));
    return res.json({ giveUpsData: giveUps });
};
export const getLessonProgress = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { lessonId } = req.params;
    const numberLessonId = Number(lessonId);
    const progressData = await lessonService.getLessonProgress(currentUserId, numberLessonId);
    res.json({
        hasCompletedAllQuizzes: progressData.hasCompletedAllQuizzes,
        progress: progressData.progress,
    });
};
export const getCurrentUser = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const user = await prisma.user.findUnique({
        where: {
            id: currentUserId,
        },
    });
    res.json({ user });
};
