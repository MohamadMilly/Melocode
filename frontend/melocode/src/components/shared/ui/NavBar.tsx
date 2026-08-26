import {
  Avatar,
  Flex,
  HoverCard,
  Skeleton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { RouteLink } from "./RouteLink";
import { useAuth } from "../../../contexts/AuthContext";
import { useMe } from "../../../hooks/api/me/useMe";
import { getAvatarFullBack } from "../../../utils/getAvatarFullback";
import { Flame, Moon, Sun, Trophy } from "lucide-react";
import { Link } from "react-router";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export function NavBar() {
  const { user } = useAuth();
  const { user: currentUser, isLoading } = useMe();
  const { theme, setTheme } = useTheme();
  const avatarFullback = getAvatarFullBack(
    currentUser?.fullname ?? user?.fullname ?? "?",
  );

  const streak = currentUser?.streak ?? 0;

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);
  return (
    <nav className="flex justify-between items-baseline sticky top-0 z-100 backdrop-blur-md px-6 py-3 border-b border-[var(--gray-6)]/15">
      <Text className="text-[var(--accent-11)]" size={"6"} weight={"medium"}>
        ميلوكود
      </Text>

      {!user && (
        <RouteLink tipContent="انشئ حساب" route="/register">
          ابدأ ←
        </RouteLink>
      )}

      <Flex gap={"3"} align={"center"}>
        {user && (
          <>
            <Flex gap={"1"} align={"center"}>
              <Skeleton loading={isLoading}>
                <Text>{streak}</Text>
              </Skeleton>
              <Flame className="text-orange-700" size={24} />
            </Flex>
            <HoverCard.Root openDelay={150}>
              <HoverCard.Trigger>
                <Link to="/profile" aria-label="الملف الشخصي">
                  <Avatar
                    src={currentUser?.profile?.avtarUrl}
                    fallback={avatarFullback}
                    className="cursor-pointer"
                  />
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Content size="1" sideOffset={8}>
                <Flex gap="3" align="center">
                  <Avatar
                    size="3"
                    src={currentUser?.profile?.avtarUrl}
                    fallback={avatarFullback}
                  />
                  <Flex direction="column" gap="1">
                    <Text weight="bold">
                      {currentUser?.fullname ?? user.fullname}
                    </Text>
                    <Text size="2" color="gray">
                      @{currentUser?.username ?? user.username}
                    </Text>
                  </Flex>
                </Flex>
              </HoverCard.Content>
            </HoverCard.Root>
          </>
        )}
        <Flex align={"center"} gap={"2"}>
          <Tooltip
            content={`تبديل الوضع (${theme === "light" ? "مشرق" : "مظلم"})`}
          >
            <button
              onClick={handleToggleTheme}
              className="text-[var(--accent-11)]"
            >
              {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </Tooltip>

          <RouteLink tipContent="لوحة المتصدرين" route="/leaderboard">
            <Trophy size={18} />
          </RouteLink>
        </Flex>
      </Flex>
    </nav>
  );
}
