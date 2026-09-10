import { param } from "express-validator";

export const validateQuizAnswerId = param("quizAnswerId")
  .isNumeric()
  .withMessage("quizAnswerId must be a number");
