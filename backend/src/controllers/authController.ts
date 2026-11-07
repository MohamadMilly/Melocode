import {
  LoginRequestBody,
  LoginResponseBody,
  RegisterRequestBody,
  RegisterResponseBody,
  UserJwtPayload,
} from "@app/types";
import type { Response, Request } from "express";
import { matchedData } from "express-validator";
import { sign, verify } from "../shared/utils/auth/jwt.js";
import { userService } from "../services/userService.js";
import { authService } from "../services/authService.js";

export const register = async (
  req: Request<{}, unknown, RegisterRequestBody>,
  res: Response<RegisterResponseBody>,
) => {
  const { password, username, fullname } = matchedData(req);

  const user = await userService.createUser({ fullname, username, password });

  const jwtPayload: UserJwtPayload = {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    createdAt: user.createdAt,
  };

  const accessToken = sign(
    { ...jwtPayload, tokenType: "access" },
    { expiresIn: "15min" },
  );
  const refreshToken = sign(
    { ...jwtPayload, tokenType: "refresh" },
    { expiresIn: "7d" },
  );

  res.json({ user: jwtPayload, accessToken, refreshToken });
};


export const login = async (
  req: Request<{}, unknown, LoginRequestBody>,
  res: Response<LoginResponseBody>,
) => {
  const { username, password } = matchedData(req);

  const user = await authService.validateCredentials(username, password);
    
  const jwtPayload: UserJwtPayload = {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    createdAt: user.createdAt,
  };
  
  const accessToken = sign(
    { ...jwtPayload, tokenType: "access" },
    { expiresIn: "15min" },
  );
  const refreshToken = sign(
    { ...jwtPayload, tokenType: "refresh" },
    { expiresIn: "7d" },
  );
  
  res.json({ user: jwtPayload, accessToken, refreshToken });
};
  
export const refreshToken = async (
  req: Request<{}, unknown, { refreshToken: string }>,
  res: Response,
) => {
  const { refreshToken: token } = req.body;
  
  const payload = verify<UserJwtPayload>(token);
  
  if (payload.tokenType !== "refresh") {
    res.status(401).json({
      message: "Use RefreshToken to refresh the access token.",
    });
    return;
  }
  const { exp, iat, tokenType, ...cleanPayLoad } = payload;
  
  const accessToken = sign(
    { tokenType: "access", ...cleanPayLoad },
    { expiresIn: "15min" },
  );

  res.json({
    accessToken: accessToken,
  });
};
