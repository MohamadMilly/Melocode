import type { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../shared/types/auth.types.js";

export function extractToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }

  next();
}
