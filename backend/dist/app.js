import express from "express";
import "dotenv/config";
import cors from "cors";
import { HttpError } from "./shared/errors/HttpError.js";
import { createServer } from "node:http";
import "./events/listeners.js";
// routers imports
import { authRouter } from "./routes/authRouter.js";
import { lessonRouter } from "./routes/lessonRouter.js";
import { meRouter } from "./routes/meRouter.js";
import { quizRouter } from "./routes/quizRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { Server } from "socket.io";
import { socketService } from "./realtime/socketService.js";
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});
io.on("connection", (socket) => { });
app.use(cors());
app.use(express.json());
socketService.initializeServer(io);
// routers
app.use("/auth", authRouter);
app.use("/lessons", lessonRouter);
app.use("/quizzes", quizRouter);
app.use("/users", userRouter);
app.use("/me", meRouter);
app.use((req, res, next) => {
    const routeError = new HttpError(404, "Route is not found.");
    next(routeError);
});
app.use((err, req, res, next) => {
    let status = err.status;
    let message = err.message;
    if (!status) {
        status = 500;
    }
    if (!message) {
        message = "Unexpected server error has occured";
    }
    if (process.env.NODE_ENV === "development") {
        console.log(err.stack);
    }
    res.status(status).json({
        message: message,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
