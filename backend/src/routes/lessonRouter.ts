import express, { type Router } from "express";
import { extractToken } from "../middlewares/auth/extractToken.js";
import { optionalVerifyToken } from "../middlewares/auth/verifyToken.js";
import * as lessonController from "../controllers/lessonController.js";
import { validateLessonId } from "../middlewares/routes/validation/lesson.param.js";

export const lessonRouter: Router = express.Router();

lessonRouter.use(extractToken);

lessonRouter.get("/", optionalVerifyToken, lessonController.getAllLessons);

lessonRouter.get(
  "/:lessonId",
  validateLessonId,
  optionalVerifyToken,
  lessonController.getLesson,
);
