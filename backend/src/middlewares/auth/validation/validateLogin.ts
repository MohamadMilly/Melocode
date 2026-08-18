import { body } from "express-validator";

const loginUsernameCheck = body("username")
  .trim()
  .notEmpty()
  .withMessage("اسم المستخدم مطلوب.");

const loginPasswordCheck = body("password")
  .trim()
  .notEmpty()
  .withMessage("كلمة المرور مطلوبة.");

export const validateLogin = [loginUsernameCheck, loginPasswordCheck];
