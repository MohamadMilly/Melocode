import express, { type Router } from "express";
import { mandatoryVerifyToken } from "../../middlewares/auth/verifyToken.js";
import { extractToken } from "../../middlewares/auth/extractToken.js";
import { validateExternalQuizId } from "../../middlewares/routes/validation/quiz.param.js";
import * as featureQuizController from "./quiz.controller.js";

const quizRouter: Router = express.Router();

quizRouter.use(extractToken);
quizRouter.use(mandatoryVerifyToken);

quizRouter.get(
  "/:external_quizId",
  validateExternalQuizId,
  featureQuizController.getQuizAnswer,
);

export default quizRouter;
