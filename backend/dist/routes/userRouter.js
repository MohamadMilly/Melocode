import express from "express";
import * as userController from "../controllers/userController.js";
export const userRouter = express.Router();
userRouter.get("/:userId/progress", userController.getUserLessonProgresses); // here we can use it by passing lessonId as query param
userRouter.get("/", userController.getUsers); // this resource for leader board
