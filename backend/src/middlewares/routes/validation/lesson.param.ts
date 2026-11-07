import { param } from "express-validator";

export const validateSlug = param("slug")
  .trim()
  .isSlug()
  .withMessage("Lesson Slug must be a valid slug");
