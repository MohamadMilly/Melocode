import express, { type Router } from "express";
import { extractToken } from "../../middlewares/auth/extractToken.js";
import { mandatoryVerifyToken } from "../../middlewares/auth/verifyToken.js";
import { validateExternalQuizId } from "../../middlewares/routes/validation/quiz.param.js";
import * as giveUpController from "./giveUp.controller.js";

const giveUpRouter: Router = express.Router();

giveUpRouter.use(extractToken);
giveUpRouter.use(mandatoryVerifyToken);

giveUpRouter.post(
  "/:external_quizId/giveups",
  validateExternalQuizId,
  giveUpController.createGiveUp,
);

export default giveUpRouter;
