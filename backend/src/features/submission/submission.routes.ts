import express, { type Router } from "express";
import { extractToken } from "../../middlewares/auth/extractToken.js";
import { mandatoryVerifyToken } from "../../middlewares/auth/verifyToken.js";
import { validateExternalQuizId } from "../../middlewares/routes/validation/quiz.param.js";
import * as submissionController from "./submission.controller.js";

const submissionRouter: Router = express.Router();

submissionRouter.use(extractToken);
submissionRouter.use(mandatoryVerifyToken);

submissionRouter.post(
  "/:external_quizId/submissions",
  validateExternalQuizId,
  submissionController.createSubmission,
);

export default submissionRouter;
