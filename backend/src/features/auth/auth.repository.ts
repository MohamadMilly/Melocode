import { prisma } from "../../infrastructure/lib/prisma.js";

export const authRepository = {
  getUserByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  },

  createUser({
    fullname,
    username,
    hashedPassword,
  }: {
    fullname: string;
    username: string;
    hashedPassword: string;
  }) {
    return prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
      },
    });
  },
};
