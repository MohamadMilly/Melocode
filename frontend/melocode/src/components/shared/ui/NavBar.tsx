import { Avatar, Flex, HoverCard, Skeleton, Text } from "@radix-ui/themes";
import { RouteLink } from "./RouteLink";
import { useAuth } from "../../../contexts/AuthContext";
import { useMe } from "../../../hooks/api/me/useMe";
import { getAvatarFullBack } from "../../../shared/utils/getAvatarFullback";
import { Flame, Menu, Settings, Star, Trophy } from "lucide-react";
import { Link } from "react-router";
import { Ping } from "./Ping";
import { Drawer } from "./Drawer";

type NavBarProps = {
  connectedUsersCount: number;
};

export function NavBar({ connectedUsersCount }: NavBarProps) {
  const { user } = useAuth();
  const { user: currentUser, isLoading } = useMe();
  const avatarFullback = getAvatarFullBack(
    currentUser?.fullname ?? user?.fullname ?? "?",
  );

  const streak = currentUser?.streak ?? 0;
  
  return (
    <nav className="flex justify-between items-center sticky top-0 z-100 backdrop-blur-md bg-[var(--gray-1)]/90 md:px-6 px-3 py-2 border-b border-[var(--gray-6)]/15">
      <Link
        to="/app"
        aria-label="ميلوكود - الصفحة الرئيسية"
        className="text-[var(--accent-11)] no-underline"
      >
        <Text size={"6"} weight={"medium"}>
          ميلوكود
        </Text>
      </Link>

      <Flex gap={"3"} align={"center"}>
        {!user && (
          <RouteLink varient={"solid"} tipContent="انشئ حساب" route="/register">
            ابدأ ←
          </RouteLink>
        )}
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
              <Flex gap={"1"}>
                <Skeleton loading={isLoading}>
                  <Text>{streak}</Text>
                </Skeleton>
                <Flame className="text-orange-700" size={24} />
              </Flex>
            </Flex>
            <HoverCard.Root openDelay={150}>
              <HoverCard.Trigger>
                <Link
                  className="h-[38px]!"
                  to="profile"
                  aria-label="الملف الشخصي"
                >
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
            <RouteLink route="/app/leaderboard" tipContent="لوحة المتصدرين">
              <span>لوحة المتصدرين</span>
              <Trophy size={18} />
            </RouteLink>
            {user && (
              <RouteLink route="/app/achievements" tipContent="الإنجازات">
                <span>الإنجازات</span>
                <Star size={18} />
              </RouteLink>
            )}
            <RouteLink route="/app/settings" tipContent="الإعدادات">
              <span>الإعدادات</span>
              <Settings size={18} />
            </RouteLink>
          </Drawer>
        </div>

        <Flex align={"center"} gap={"2"} className="hidden! md:flex!">
          <RouteLink tipContent="لوحة المتصدرين" route="/app/leaderboard">
            <Trophy size={18} />
          </RouteLink>
          {user && (
            <RouteLink route="/app/achievements" tipContent="الإنجازات">
              <Star size={18} />
            </RouteLink>
          )}
          <RouteLink tipContent="الإعدادات" route="/app/settings">
            <Settings size={18} />
          </RouteLink>
        </Flex>
      </Flex>
    </nav>
  );
}
