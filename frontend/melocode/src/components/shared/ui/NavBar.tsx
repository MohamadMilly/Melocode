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
import { getAvatarFullBack } from "../../../shared/utils/getAvatarFullback";
import { Flame, Menu, Moon, Star, Sun, Trophy } from "lucide-react";
import { Link } from "react-router";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { Ping } from "./Ping";
import { Drawer } from "./Drawer";

type NavBarProps = {
  connectedUsersCount: number;
};

export function NavBar({ connectedUsersCount }: NavBarProps) {
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

  const isDarkMode = theme === "dark";

  return (
    <nav className="flex justify-between items-center sticky top-0 z-100 backdrop-blur-md md:px-6 px-3 py-2 border-b border-[var(--gray-6)]/15">
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
            <Flex gap={"1"} align={"center"} className="hidden md:flex">
              <Flex align={"center"} gap={"1"}>
                <Ping />
                <Text as="span" size={"2"}>
                  {connectedUsersCount} متصلون
                </Text>
              </Flex>
              <div className="mx-1">
                <Text
                  size={"3"}
                  className="text-[var(--gray-11)] pointer-events-none select-none"
                >
                  •
                </Text>
              </div>
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

        <div className="md:hidden">
          <Drawer
            title="القائمة"
            trigger={
              <button
                type="button"
                aria-label="فتح القائمة"
                className="flex items-center justify-center rounded-md border border-[var(--gray-6)]/20 bg-[var(--gray-2)] p-2 text-[var(--accent-11)]"
              >
                <Menu size={20} />
              </button>
            }
          >
            <RouteLink route="/leaderboard" tipContent="لوحة المتصدرين">
              <span>لوحة المتصدرين</span>
              <Trophy size={18} />
            </RouteLink>
            <RouteLink route="/achievements" tipContent="الإنجازات">
              <span>الإنجازات</span>
              <Star size={18} />
            </RouteLink>
            <button
              type="button"
              onClick={handleToggleTheme}
              className="flex items-center justify-between gap-2 rounded-md border border-[var(--gray-6)]/20 bg-[var(--gray-2)] px-3 py-2 text-sm font-medium text-[var(--accent-11)]"
            >
              <span>{isDarkMode ? "الوضع الفاتح" : "الوضع الداكن"}</span>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </Drawer>
        </div>

        <Flex align={"center"} gap={"2"} className="hidden! md:flex!">
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
          <RouteLink route="/achievements" tipContent="الإنجازات">
            <Star size={18} />
          </RouteLink>
        </Flex>
      </Flex>
    </nav>
  );
}
