import express from "express";
import * as userController from "../controllers/userController.js";
import { validateUserId } from "../middlewares/routes/validation/user.params.js";
import { validateSortParam } from "../middlewares/routes/validation/user.params.js";
import { handleValidationErrors } from "../middlewares/shared/handleValidationErrors.js";
export const userRouter = express.Router();
userRouter.get("/:userId/progress", validateUserId, userController.getUserLessonProgresses); // here we can use it by passing lessonId as query param
userRouter.get("/", validateSortParam, handleValidationErrors, userController.getUsers); // this resource for leader board
