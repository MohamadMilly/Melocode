import express, { type Router } from "express";
import * as meController from "../controllers/meController.js";
import { extractToken } from "../middlewares/auth/extractToken.js";
import { mandatoryVerifyToken } from "../middlewares/auth/verifyToken.js";
import { validateLessonId } from "../middlewares/routes/validation/lesson.param.js";
import { validateQuizAnswerId } from "../middlewares/routes/validation/quiz.param.js";

export const meRouter: Router = express.Router();

meRouter.use(extractToken);
meRouter.use(mandatoryVerifyToken);

meRouter.get("/", meController.getCurrentUser);
meRouter.post(
  "/lessons/:lessonId/progress",
  validateLessonId,
  meController.createLessonProgress,
);

meRouter.get(
  "/lessons/:lessonId/submissions",
  validateLessonId,
  meController.getLessonQuizzesSubmissions,
);

meRouter.get(
  "/quizzes/:quizAnswerId/submissions",
  validateQuizAnswerId,
  meController.getQuizSubmissions,
);

meRouter.post(
  "/quizzes/:quizAnswerId/giveups",
  validateQuizAnswerId,
  meController.giveUpToQuiz,
);

meRouter.get(
  "/quizzes/:quizAnswerId/giveups",
  validateQuizAnswerId,
  meController.getUserQuizGiveUp,
);

meRouter.get(
  "/lessons/:lessonId/giveups",
  validateLessonId,
  meController.getUserQuizzesGiveUpsForLesson,
);

meRouter.get("/achievements", meController.getUserAchievements);
