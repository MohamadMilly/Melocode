import { prisma } from "../lib/prisma.js";
import { HttpError } from "../shared/errors/HttpError.js";
import { eventEmitter } from "../lib/eventEmitter.js";
export const getQuizAnswer = async ({ answerId, userId, }) => {
    const quizAnswer = await prisma.quizAnswer.findUnique({
        where: {
            id: answerId,
        },
        include: {
            items: true,
            giveUps: {
                where: {
                    userId: userId,
                },
            },
            submissions: {
                where: {
                    userId: userId,
                    isCorrect: true,
                },
            },
        },
    });
    if (!quizAnswer) {
        throw new HttpError(404, "لم يتم العثور على إجابة هذا الاختبار.");
    }
    const hasGivenUpOrAnsweredCorrectly = quizAnswer.giveUps.length >= 1 || quizAnswer.submissions.length >= 1;
    if (!hasGivenUpOrAnsweredCorrectly) {
        throw new HttpError(400, "يمكنك فقط عرض الإجابة بعد الاستسلام أو الإجابة بشكل صحيح لمزيد من الشرح.");
    }
    return quizAnswer;
};
export const saveSubmission = async ({ content, language, quizAnswerId, userOutputs, userId, }) => {
    const giveUpForThisQuiz = await prisma.quizGiveUp.findUnique({
        where: {
            userId_quizAnswerId: {
                userId,
                quizAnswerId,
            },
        },
    });
    if (giveUpForThisQuiz) {
        throw new HttpError(400, "لقد استسلمت لهذا الاختبار. لا يمكنك إرسال حلول جديدة.");
    }
    const testCases = await prisma.testCase.findMany({
        where: {
            quizAnswerId: quizAnswerId,
        },
    });
    if (testCases.length === 0) {
        throw new HttpError(400, "هذا الاختبار لا يحتوي على حالات اختبار. يرجى التواصل مع المسؤول.");
    }
    const isCorrect = testCases.every((testCase) => {
        const userOutput = userOutputs.find((userOutput) => userOutput.testCaseId === testCase.id);
        if (!userOutput || !userOutput.output) {
            return false;
        }
        return userOutput.output.toString().includes(testCase.output);
    });
    const submission = await prisma.quizSubmission.upsert({
        where: {
            userId_quizAnswerId_isCorrect: {
                userId: userId,
                quizAnswerId: quizAnswerId,
                isCorrect: isCorrect,
            },
        },
        update: {
            content: content,
            language,
        },
        create: {
            content,
            language,
            userId,
            quizAnswerId,
            isCorrect,
        },
    });
    if (submission.isCorrect) {
        eventEmitter.emit("submission-created", { userId: userId });
    }
    return submission;
};
export const getQuizTestCasesInputs = async (quizAnswerId) => {
    const testCases = await prisma.testCase.findMany({
        where: {
            quizAnswerId: quizAnswerId,
        },
        select: {
            id: true,
            input: true,
        },
    });
    return testCases;
};
export const getUserLessonSubmissions = async (userId, lessonId, isCorrect) => {
    if (!userId || !lessonId) {
        throw new HttpError(400, "معلومات مطلوبة مفقودة (lessonId و userId)");
    }
    const submissionsData = await prisma.quizAnswer.findMany({
        where: {
            lessonId: lessonId,
        },
        select: {
            id: true,
            submissions: {
                where: {
                    userId: userId,
                    isCorrect: isCorrect,
                },
            },
        },
    });
    return submissionsData;
};
export const getUserQuizSubmissions = async (quizAnswerId, userId) => {
    const submissions = await prisma.quizSubmission.findMany({
        where: {
            quizAnswerId: quizAnswerId,
            userId: userId,
        },
    });
    return submissions;
};
