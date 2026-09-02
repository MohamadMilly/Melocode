import { useEffect, useState } from "react";
import { NavBar } from "./components/shared/ui/NavBar";
import { Outlet } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import { socket } from "./socket";
import type { Achievement } from "@app/types";
import { AchievementDialog } from "./components/shared/ui/AchievementDialog";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedUsersCount, setConnectedUsersCount] = useState<number>(0);
  const [activeAchievement, setActiveAchievement] =
    useState<Achievement | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    function onConnect(): void {
      setIsConnected(true);
    }
    function onDisConnect(): void {
      setIsConnected(false);
    }
    function initializeConnectedUsers(count: number): void {
      setConnectedUsersCount(count);
    }
    
    function onReceiveAchievement(achievement: Achievement) {
      setActiveAchievement(achievement);
      toast.loading("Updating your achievements...");
    }
    
    function onAppError({
      context,
      message,
    }: {
      context: string;
      message: string;
    }) {
      toast.error(`Error in: ${context}, ${message}`);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisConnect);
    socket.on("connected users", initializeConnectedUsers);
    socket.on("achievement", onReceiveAchievement);
    socket.on("app_error", onAppError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisConnect);
      socket.off("connected users", initializeConnectedUsers);
      socket.off("achievement", onReceiveAchievement);
      socket.off("app_error", onAppError);
    };
  }, []);
  return (
    <div dir="rtl">
      <NavBar connectedUsersCount={connectedUsersCount} />
      <Outlet />
      <AchievementDialog
        achievement={activeAchievement}
        onOpenChange={(open) => {
          if (!open) setActiveAchievement(null);
        }}
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
