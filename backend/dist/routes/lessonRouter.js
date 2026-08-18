import express from "express";
import { extractToken } from "../middlewares/auth/extractToken.js";
import { optionalVerifyToken } from "../middlewares/auth/verifyToken.js";
import * as lessonController from "../controllers/lessonController.js";
export const lessonRouter = express.Router();
lessonRouter.use(extractToken);
lessonRouter.get("/", optionalVerifyToken, lessonController.getAllLessons);
