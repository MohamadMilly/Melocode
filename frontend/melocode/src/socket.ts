import type { User } from "@app/types";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL;
if (!URL) {
  throw new Error(
    "API_URL is not set, which caused socket.io connection to fail.",
  );
}

const rawUser = localStorage.getItem("user");

let user: User | null = null;
// wrapping the parsing process with try/catch not to cause sudden crash of the user is not parsable
if (rawUser) {
  try {
    user = JSON.parse(rawUser) as User;
  } catch {
    user = null;
  }
}

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    userId: user ? user.id : null,
  },
});
