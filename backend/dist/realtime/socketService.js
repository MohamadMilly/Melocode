class SocketService {
    socketsMap;
    _io;
    constructor() {
        this.socketsMap = new Map();
        this._io = null;
    }
    get io() {
        if (!this._io) {
            throw new Error("Cannot emit evenets without initializing the server.");
        }
        return this._io;
    }
    initializeServer(io) {
        this._io = io;
        this.setUpEvents();
    }
    setUpEvents() {
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
                const count = this.socketsMap.get(socketKey) - 1;
                if (count === 0) {
                    this.socketsMap.delete(socketKey);
                }
                else {
                    this.socketsMap.set(socketKey, count);
                }
                this.sendConnectedUsersCount();
            });
        });
    }
    getConnectedUsersCount() {
        return this.socketsMap.size;
    }
    sendConnectedUsersCount() {
        this.io.emit("connected users", this.getConnectedUsersCount());
    }
    sendAchievement(userId, achievement) {
        const roomId = `user:${userId}`;
        this.io.to(roomId).emit("achievement", achievement);
    }
    sendError(context, message, userId) {
        const roomId = `user:${userId}`;
        this.io.to(roomId).emit("app_error", {
            context: context,
            message,
        });
    }
}
export const socketService = new SocketService();
