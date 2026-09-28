import express, { type Router } from "express";
import * as pathController from "../controllers/pathController.js";
import { extractToken } from "../middlewares/auth/extractToken.js";
import { optionalVerifyToken } from "../middlewares/auth/verifyToken.js";

export const pathRouter: Router = express.Router();

pathRouter.use(extractToken);

pathRouter.get("/", pathController.getAllPaths);
pathRouter.get(
  "/:slug/modules",
  optionalVerifyToken,
  pathController.getModulesForPath,
);
