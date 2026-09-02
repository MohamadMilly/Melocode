import { Server, type Socket } from "socket.io";
import { Achievement } from "../generated/prisma/client.js";

class SocketService {
  private socketsMap: Map<string, number>;
  _io: Server | null;

  constructor() {
    this.socketsMap = new Map();
    this._io = null;
  }

  private get io(): Server {
    if (!this._io) {
      throw new Error("Cannot emit evenets without initializing the server.");
    }
    return this._io;
  }
  public initializeServer(io: Server) {
    this._io = io;
    this.setUpEvents();
  }

  public setUpEvents(): void {
    /* Frontend connects => connection is called and socket is passed and listeners are attached => so the socketKey is never changed */
    this.io.on("connection", (socket) => {
      const userId = socket.handshake.auth.userId;
      const socketKey = `user-${userId}`;
      const count = this.socketsMap.get(socketKey) ?? 0;
      const roomId = `user:${socket.handshake.auth.userId}`;

      socket.join(roomId);
      this.socketsMap.set(socketKey, count + 1);

      // send connected users count to the just connected user
      this.sendConnectedUsersCount();

      socket.on("disconnect", () => {
        const count = (this.socketsMap.get(socketKey) as number) - 1;
        if (count === 0) {
          this.socketsMap.delete(socketKey);
        } else {
          this.socketsMap.set(socketKey, count);
        }
        this.sendConnectedUsersCount();
      });
    });
  }
  
  public getConnectedUsersCount(): number {
    return this.socketsMap.size;
  }

  public sendConnectedUsersCount() {
    this.io.emit("connected users", this.getConnectedUsersCount());
  }

  public sendAchievement(userId: number, achievement: Achievement) {
    const roomId = `user:${userId}`;
    this.io.to(roomId).emit("achievement", achievement);
  }

  public sendError(context: string, message: string, userId: number) {
    const roomId = `user:${userId}`;

    this.io.to(roomId).emit("app_error", {
      context: context,
      message,
    });
  }
}

export const socketService = new SocketService();
