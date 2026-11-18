import express, { type Router } from "express";
import { extractToken } from "../../middlewares/auth/extractToken.js";
import { optionalVerifyToken } from "../../middlewares/auth/verifyToken.js";
import * as pathController from "./path.controller.js";

const pathRouter: Router = express.Router();

pathRouter.use(extractToken);

pathRouter.get("/", pathController.getAllPaths);
pathRouter.get(
  "/:slug/modules",
  optionalVerifyToken,
  pathController.getModulesForPath,
);

export default pathRouter;
