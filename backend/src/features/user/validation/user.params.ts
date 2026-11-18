import { param, query } from "express-validator";

export const validateUserId = param("userId")
  .isNumeric()
  .withMessage("userId must be a number");

export const validateSortParam = query("sortBy")
  .optional()
  .custom((value) => {
    const sortParamRegex = /^[+-](submissions|progress|streak)$/;
    if (typeof value !== "string" || !sortParamRegex.test(value)) {
      throw new Error(
        "sortBy must be +submissions, -submissions, +progress, -progress, +streak, or -streak",
      );
    }
    return true;
  });
