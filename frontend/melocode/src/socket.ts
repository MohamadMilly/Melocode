import type { User } from "@app/types";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL;

const rawUser = localStorage.getItem("user");
const user = (rawUser ? JSON.parse(rawUser) : null) as User | null;

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    userId: user?.id,
  },
});
