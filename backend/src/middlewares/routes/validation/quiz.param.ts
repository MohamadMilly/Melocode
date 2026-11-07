import { param } from "express-validator";

export const validateExternalQuizId = param("external_quizId")
  .isUUID()
  .withMessage("external_quizId must be a UUID");
