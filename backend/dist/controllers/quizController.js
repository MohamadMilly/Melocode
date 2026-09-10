import * as quizService from "../services/quizService.js";
export const getQuizAnswer = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { quizAnswerId } = req.params;
    const quizAnswer = await quizService.getQuizAnswer({
        answerId: Number(quizAnswerId),
        userId: currentUserId,
    });
    return res.json({ quizAnswer });
};
export const getQuizTestCasesInputs = async (req, res) => {
    const { quizAnswerId } = req.params;
    const testCases = await quizService.getQuizTestCasesInputs(Number(quizAnswerId));
    return res.json({ testCases });
};
export const saveQuizSubmission = async (req, res) => {
    const currentUserId = req.currentUser?.id;
    const { quizAnswerId } = req.params;
    const { content, language, userOutputs } = req.body;
    const submission = await quizService.saveSubmission({
        content,
        language,
        quizAnswerId: Number(quizAnswerId),
        userOutputs,
        userId: currentUserId,
    });
    return res.status(201).json({ submission });
};
