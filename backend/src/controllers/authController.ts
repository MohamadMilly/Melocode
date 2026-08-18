import {
  LoginRequestBody,
  LoginResponseBody,
  RegisterRequestBody,
  RegisterResponseBody,
  UserJwtPayload,
} from "@app/types";
import type { Response, Request } from "express";
import { matchedData } from "express-validator";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../shared/errors/HttpError.js";
import { sign, verify } from "../shared/utils/auth/jwt.js";
import bcrypt from "bcryptjs";

export const register = async (
  req: Request<{}, unknown, RegisterRequestBody>,
  res: Response<RegisterResponseBody>,
) => {
  const { password, username, fullname } = matchedData(req);

  const user = await prisma.user.create({
    data: {
      password: await bcrypt.hash(password, 10),
      username,
      fullname,
    },
  });
  const jwtPayload: UserJwtPayload = {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    createdAt: user.createdAt,
  };
  const accessToken = sign(jwtPayload, { expiresIn: "15min" });
  const refreshToken = sign(jwtPayload, { expiresIn: "7d" });

  res.json({ user: jwtPayload, accessToken, refreshToken });
};

export const login = async (
  req: Request<{}, unknown, LoginRequestBody>,
  res: Response<LoginResponseBody>,
) => {
  const { username, password } = matchedData(req);

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new HttpError(400, "اسم المستخدم أو كلمة المرور غير صحيحة.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new HttpError(400, "اسم المستخدم أو كلمة المرور غير صحيحة.");
  }

  const jwtPayload: UserJwtPayload = {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    createdAt: user.createdAt,
  };

  const accessToken = sign(jwtPayload, { expiresIn: "15min" });
  const refreshToken = sign(jwtPayload, { expiresIn: "7d" });

  res.json({ user: jwtPayload, accessToken, refreshToken });
};

export const refreshToken = async (
  req: Request<{}, unknown, { refreshToken: string }>,
  res: Response,
) => {
  const { refreshToken: token } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: "UnAuthorized: refreshToken is required.",
    });
  }
  const payload = verify<UserJwtPayload>(token);
  const { exp, iat, ...clearnPayLoad } = payload;
  const accessToken = sign(clearnPayLoad, { expiresIn: "15min" });

  res.json({
    accessToken: accessToken,
  });
};
