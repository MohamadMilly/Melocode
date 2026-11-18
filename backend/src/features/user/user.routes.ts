import express, { type Router } from "express";
import { handleValidationErrors } from "../../middlewares/shared/handleValidationErrors.js";
import * as userController from "./user.controller.js";
import { validateSortParam, validateUserId } from "./validation/user.params.js";

const userRouter: Router = express.Router();

userRouter.get(
  "/:userId/progress",
  validateUserId,
  userController.getUserLessonProgresses,
);

userRouter.get(
  "/",
  validateSortParam,
  handleValidationErrors,
  userController.getUsers,
);

export default userRouter;
