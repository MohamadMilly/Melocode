import { NextFunction, Request, Response } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const opts = {
  points: 10,
  duration: 1,
};

const rateLimiter: RateLimiterMemory = new RateLimiterMemory(opts);

export function rateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => {
      res.status(429).json({ message: "Too many Requests" });
    });
}
