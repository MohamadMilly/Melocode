import { Server } from "socket.io";
import type { Achievement } from "@app/types";

class SocketService {
  private readonly socketsMap = new Map<string, number>();
  private io: Server | null = null;
 
  initializeServer(io: Server) {
    this.io = io;
    this.setUpEvents();
  }

  private get initializedIo(): Server {
    if (!this.io) {
      throw new Error("Cannot emit evenets without initializing the server.");
    }
    return this.io;
  }

  private setUpEvents(): void {
    this.initializedIo.on("connection", (socket) => {
      const userId = socket.handshake.auth.userId;
      const socketKey = `user-${userId}`;
      const count = this.socketsMap.get(socketKey) ?? 0;
      const roomId = `user:${userId}`;
       
      socket.join(roomId);
      this.socketsMap.set(socketKey, count + 1);
      this.sendConnectedUsersCount();
       
      socket.on("disconnect", () => {
        const remainingConnections = (this.socketsMap.get(socketKey) ?? 1) - 1;
        if (remainingConnections === 0) {
          this.socketsMap.delete(socketKey);
        } else {
          this.socketsMap.set(socketKey, remainingConnections);
        }
        this.sendConnectedUsersCount();
      });
    });
  }

  getConnectedUsersCount(): number {
    return this.socketsMap.size;
  }

  sendConnectedUsersCount() {
    this.initializedIo.emit("connected users", this.getConnectedUsersCount());
  }

  sendAchievement(userId: number, achievement: Achievement) {
    this.initializedIo
      .to(`user:${userId}`)
      .emit("achievement", achievement);
  }

  sendError(context: string, message: string, userId: number) {
    this.initializedIo.to(`user:${userId}`).emit("app_error", {
      context,
      message,
    });
  }
}

export const socketService = new SocketService();
