import express, { type Router } from "express";
import { extractToken } from "../../middlewares/auth/extractToken.js";
import { mandatoryVerifyToken } from "../../middlewares/auth/verifyToken.js";
import { validateExternalQuizId } from "../../middlewares/routes/validation/quiz.param.js";
import * as testCaseController from "./testCase.controller.js";

const testCaseRouter: Router = express.Router();

testCaseRouter.use(extractToken);
testCaseRouter.use(mandatoryVerifyToken);

testCaseRouter.get(
  "/:external_quizId/test-cases",
  validateExternalQuizId,
  testCaseController.getQuizTestCasesInputs,
);

export default testCaseRouter;
