import bcrypt from "bcryptjs";
import { HttpError } from "../../shared/errors/HttpError.js";
import type { CreateAuthUserDto } from "./auth.dto.js";
import { authRepository } from "./auth.repository.js";

export const authService = {
  createUser: async ({ fullname, username, password }: CreateAuthUserDto) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return authRepository.createUser({
      fullname,
      username,
      hashedPassword,
    });
  },

  validateCredentials: async (username: string, password: string) => {
    const user = await authRepository.getUserByUsername(username);
    const passwordHash =
      user?.password ??
      "$2b$10$abcdefghijklmnopqrstuvwxABCDEFGHIJKLMNOPQRSTUVwxy";
    const isValidPassword = await bcrypt.compare(password, passwordHash);

    if (!user || !isValidPassword) {
      throw new HttpError(400, "اسم المستخدم أو كلمة المرور غير صحيحة.");
    }

    return user;
  },
};
