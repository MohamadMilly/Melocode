import express, { type Router } from "express";
import * as meController from "../controllers/meController.js";
import { extractToken } from "../middlewares/auth/extractToken.js";
import { mandatoryVerifyToken } from "../middlewares/auth/verifyToken.js";
import { validateSlug } from "../middlewares/routes/validation/lesson.param.js";
import { validateExternalQuizId } from "../middlewares/routes/validation/quiz.param.js";

export const meRouter: Router = express.Router();

meRouter.use(extractToken);
meRouter.use(mandatoryVerifyToken);

meRouter.get("/", meController.getCurrentUser);
meRouter.post(
  "/lessons/:slug/progress",
  validateSlug,
  meController.createLessonProgress,
);

meRouter.get(
  "/lessons/:slug/submissions",
  validateSlug,
  meController.getLessonQuizzesSubmissions,
);

meRouter.get(
  "/quizzes/:external_quizId/submissions",
  validateExternalQuizId,
  meController.getQuizSubmissions,
);

meRouter.post(
  "/quizzes/:external_quizId/giveups",
  validateExternalQuizId,
  meController.giveUpToQuiz,
);

meRouter.get(
  "/quizzes/:external_quizId/giveups",
  validateExternalQuizId,
  meController.getUserQuizGiveUp,
);

meRouter.get(
  "/lessons/:slug/giveups",
  validateSlug,
  meController.getUserQuizzesGiveUpsForLesson,
);

meRouter.get("/achievements", meController.getUserAchievements);
