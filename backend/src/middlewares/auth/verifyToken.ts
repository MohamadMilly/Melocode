import { UserJwtPayload } from "@app/types";
import { HttpError } from "../../shared/errors/HttpError.js";

import { verify } from "../../shared/utils/auth/jwt.js";

import type { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../types/index.js";

export function getVerifyTokenMiddleware({
  isOptional,
}: {
  isOptional: boolean;
}) {
  return function verifyToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.token;
      if (!token && !isOptional) {
        throw new HttpError(401, "Authentication token required");
      }
      if (token) {
        const authData = verify<UserJwtPayload>(token);
        
        if (authData.tokenType !== "access") {
          res.status(401).json({
            message:
              "Refresh the token then send accessToken to access protected routes.",
          });
          return;
        }
        if (authData) {
          req.currentUser = authData;
          req.authStatus = "Authorized";
        }
      } else {
        req.authStatus = "UnAuthorized";
      }
      next();
    } catch (err: any) {
      if (!err.status) {
        err.status = 401;
      }
      if (isOptional) {
        req.authStatus = "UnAuthorized";
        next();
      } else next(err);
    }
  };
}

const optionalVerifyToken = getVerifyTokenMiddleware({ isOptional: true });
const mandatoryVerifyToken = getVerifyTokenMiddleware({ isOptional: false });

export { optionalVerifyToken, mandatoryVerifyToken };
