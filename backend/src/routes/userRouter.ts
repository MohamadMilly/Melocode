import express, { type Router } from "express";
import * as userController from "../controllers/userController.js";

export const userRouter: Router = express.Router();

userRouter.get("/:userId/progress", userController.getUserLessonProgresses); // here we can use it by passing lessonId as query param

userRouter.get("/", userController.getUsers); // this resource for leader board
