import express, { type Router } from "express";
import { extractToken } from "../../middlewares/auth/extractToken.js";
import { optionalVerifyToken } from "../../middlewares/auth/verifyToken.js";
import { validateSlug } from "../../middlewares/routes/validation/lesson.param.js";
import * as lessonController from "./lesson.controller.js";

const lessonRouter: Router = express.Router();

lessonRouter.get(
  "/:slug",
  extractToken,
  validateSlug,
  optionalVerifyToken,
  lessonController.getLesson,
);

export default lessonRouter;
