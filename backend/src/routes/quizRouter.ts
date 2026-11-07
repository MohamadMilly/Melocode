import express, { type Router } from "express";
import { mandatoryVerifyToken } from "../middlewares/auth/verifyToken.js";
import * as quizController from "../controllers/quizController.js";
import { extractToken } from "../middlewares/auth/extractToken.js";
import { validateExternalQuizId } from "../middlewares/routes/validation/quiz.param.js";

export const quizRouter: Router = express.Router();

quizRouter.use(extractToken);
quizRouter.use(mandatoryVerifyToken);

quizRouter.get(
  "/:external_quizId",
  validateExternalQuizId,
  quizController.getQuizAnswer,
);
quizRouter.get(
  "/:external_quizId/test-cases",
  validateExternalQuizId,
  quizController.getQuizTestCasesInputs,
);


quizRouter.post(
  "/:external_quizId/submissions",
  validateExternalQuizId,
  quizController.saveQuizSubmission,
);
