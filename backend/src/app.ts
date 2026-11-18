import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { HttpError } from "./shared/errors/HttpError.js";
import { createServer } from "node:http";

import { features, registerFeatures } from "./features/index.js";
import { Server } from "socket.io";
import { socketService } from "./infrastructure/realtime/socketService.js";
import helmet from "helmet";
import { rateLimiterMiddleware } from "./middlewares/shared/rateLimiter.js";

const app: Express = express();
const server = createServer(app);

app.use(helmet());
app.use(rateLimiterMiddleware);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "OPTIONS", "GET", "DELETE", "PUT", "PATCH"],
  }),
);

app.use(express.json());

socketService.initializeServer(io);

// routers

registerFeatures(app, features);

// health route
app.get("/health", (req: Request, res: Response<{ health: "ok" }>) => {
  res.json({
    health: "ok",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const routeError = new HttpError(404, "Route is not found.");
  next(routeError);
});

app.use(
  (
    err: any,
    req: Request,
    res: Response<{ message: string }>,
    next: NextFunction,
  ) => {
    let status = err.status;
    let message = err.message;
    if (!status) {
      status = 500;
    }
    if (!message) {
      message = "Unexpected server error has occured";
    }

    console.log(err.stack);

    res.status(status).json({
      message: message,
      ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
  },
);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
