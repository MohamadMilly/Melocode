import express, { type Router } from "express";
import {
  login,
  refreshToken,
  register,
} from "../controllers/authController.js";
import { validateLogin } from "../middlewares/auth/validation/validateLogin.js";
import { validateRegister } from "../middlewares/auth/validation/validateRegister.js";
import { handleValidationErrors } from "../middlewares/shared/handleValidationErrors.js";
import { validateRefreshToken } from "../middlewares/auth/validation/validateRefreshToken.js";

export const authRouter: Router = express.Router();

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
