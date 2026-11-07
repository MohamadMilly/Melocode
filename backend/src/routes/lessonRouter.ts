import express, { type Router } from "express";
import { extractToken } from "../middlewares/auth/extractToken.js";
import { optionalVerifyToken } from "../middlewares/auth/verifyToken.js";
import * as lessonController from "../controllers/lessonController.js";
import { validateSlug } from "../middlewares/routes/validation/lesson.param.js";

export const lessonRouter: Router = express.Router();

lessonRouter.use(extractToken);

lessonRouter.get(
  "/:slug",
  validateSlug,
  optionalVerifyToken,
  lessonController.getLesson,
);
