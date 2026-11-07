import bcrypt from "bcryptjs";
import { HttpError } from "../shared/errors/HttpError.js";
import { userRepository } from "../repositories/user.repository.js";

function createAuthService({ bcrypt, userRepository }) {
  return {
    validateCredentials: async (username: string, password: string) => {
      const user = await userRepository.getUserByUsername(username);
      // dummy hash if the user is not found
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
}

export const authService = createAuthService({
  bcrypt,
  userRepository,
});
