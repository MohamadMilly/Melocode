import express, { type Router } from "express";
import { login, refreshToken, register } from "./auth.controller.js";
import { handleValidationErrors } from "../../middlewares/shared/handleValidationErrors.js";
import { validateLogin } from "./validation/validateLogin.js";
import { validateRefreshToken } from "./validation/validateRefreshToken.js";
import { validateRegister } from "./validation/validateRegister.js";

const authRouter: Router = express.Router();

authRouter.post("/login", validateLogin, handleValidationErrors, login);
authRouter.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  register,
);
authRouter.post(
  "/refresh",
  validateRefreshToken,
  handleValidationErrors,
  refreshToken,
);

export default authRouter;
