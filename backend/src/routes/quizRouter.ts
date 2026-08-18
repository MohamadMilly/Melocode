import express, { type Router } from "express";
import { mandatoryVerifyToken } from "../middlewares/auth/verifyToken.js";
import * as quizController from "../controllers/quizController.js";
import { extractToken } from "../middlewares/auth/extractToken.js";

export const quizRouter: Router = express.Router();

quizRouter.use(extractToken);

quizRouter.get("/:quizAnswerId", quizController.getQuizAnswer);
quizRouter.get(
  "/:quizAnswerId/test-cases",
  quizController.getQuizTestCasesInputs,
);

quizRouter.use(mandatoryVerifyToken);

quizRouter.post(
  "/:quizAnswerId/submissions",
  quizController.saveQuizSubmission,
);
