import express, { type Router } from "express";
import { extractToken } from "../../middlewares/auth/extractToken.js";
import { mandatoryVerifyToken } from "../../middlewares/auth/verifyToken.js";
import { validateSlug } from "../../middlewares/routes/validation/lesson.param.js";
import * as progressController from "./progress.controller.js";

const progressRouter: Router = express.Router({ mergeParams: true });

progressRouter.post(
  "/",
  extractToken,
  mandatoryVerifyToken,
  validateSlug,
  progressController.createProgress,
);

export default progressRouter;
