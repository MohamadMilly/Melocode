import { body } from "express-validator";
import { prisma } from "../../../lib/prisma.js";
const validateFullname = body("fullname")
    .trim()
    .notEmpty()
    .withMessage("الاسم الكامل مطلوب.")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("يُسمح فقط بالحروف والمسافات في الاسم الكامل.");
const validateUserName = body("username")
    .trim()
    .notEmpty()
    .withMessage("اسم المستخدم مطلوب.")
    .isAlphanumeric("en-US")
    .withMessage("يُسمح فقط بالحروف والأرقام في اسم المستخدم.")
    .isLength({ min: 3, max: 20 })
    .withMessage("يجب أن يكون اسم المستخدم بين 3 و 20 حرفًا.")
    .custom(async (value) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            username: value,
        },
    });
    if (existingUser) {
        throw new Error("اسم المستخدم موجود بالفعل.");
    }
    return true;
});
const validatePassword = body("password")
    .trim()
    .notEmpty()
    .withMessage("كلمة المرور مطلوبة.")
    .isLength({ min: 8 })
    .withMessage("يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل.")
    .matches(/[A-Z]/)
    .withMessage("يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.")
    .matches(/[0-9]/)
    .withMessage("يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.");
const validateConfirmPassword = body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("تأكيد كلمة المرور مطلوب.")
    .custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("كلمتا المرور غير متطابقتين.");
    }
    return true;
});
export const validateRegister = [
    validateFullname,
    validateUserName,
    validatePassword,
    validateConfirmPassword,
];
