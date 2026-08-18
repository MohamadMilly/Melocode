import { prisma } from "../lib/prisma.js";
import { HttpError } from "../shared/errors/HttpError.js";
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
        throw new HttpError(404, "This Quiz answer is not found.");
    }
    const hasGivenUpOrAnsweredCorrectly = quizAnswer.giveUps.length >= 1 || quizAnswer.submissions.length >= 1;
    if (!hasGivenUpOrAnsweredCorrectly) {
        throw new HttpError(400, "You can only get the answer when give up or answer correctly for more explaination.");
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
        throw new HttpError(400, "You gave up this quiz. you cannot send submissions.");
    }
    const testCases = await prisma.testCase.findMany({
        where: {
            quizAnswerId: quizAnswerId,
        },
    });
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
        throw new HttpError(400, "Missing Required Identifiers (lessonId & userId)");
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
