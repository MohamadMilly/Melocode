import { body } from "express-validator";

export const validateRefreshToken = body("refreshToken").trim()
  .notEmpty()
  .withMessage("Refresh token is required")
 
