import express, { type Router } from "express";
import { extractToken } from "../../middlewares/auth/extractToken.js";
import { mandatoryVerifyToken } from "../../middlewares/auth/verifyToken.js";
import { validateSlug } from "../../middlewares/routes/validation/lesson.param.js";
import { validateExternalQuizId } from "../../middlewares/routes/validation/quiz.param.js";
import * as meController from "./me.controller.js";

const meRouter: Router = express.Router();

meRouter.use(extractToken);
meRouter.use(mandatoryVerifyToken);

meRouter.get("/", meController.getCurrentUser);
meRouter.get(
  "/lessons/:slug/submissions",
  validateSlug,
  meController.getLessonSubmissions,
);
meRouter.get(
  "/quizzes/:external_quizId/submissions",
  validateExternalQuizId,
  meController.getQuizSubmissions,
);
meRouter.get(
  "/quizzes/:external_quizId/giveups",
  validateExternalQuizId,
  meController.getQuizGiveUp,
);
meRouter.get(
  "/lessons/:slug/giveups",
  validateSlug,
  meController.getLessonGiveUps,
);
meRouter.get("/achievements", meController.getUserAchievements);

export default meRouter;
