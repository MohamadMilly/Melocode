import { param } from "express-validator";

export const validateLessonId = param("lessonId")
  .isNumeric()
  .withMessage("LessonId must be a number");
