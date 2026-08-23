import { Avatar, Flex, HoverCard, Skeleton, Text } from "@radix-ui/themes";
import { RouteLink } from "./RouteLink";
import { useAuth } from "../../../contexts/AuthContext";
import { useMe } from "../../../hooks/api/me/useMe";
import { getAvatarFullBack } from "../../../utils/getAvatarFullback";
import { Flame } from "lucide-react";
import { Link } from "react-router";

export function NavBar() {
  const { user } = useAuth();
  const { user: currentUser, isLoading } = useMe();
  const avatarFullback = getAvatarFullBack(
    currentUser?.fullname ?? user?.fullname ?? "?",
  );
 
  const streak = currentUser?.streak ?? 0;
  
  return (
    <nav className="flex justify-between items-baseline sticky top-0 z-100 backdrop-blur-md px-6 py-3 border-b border-[var(--gray-6)]/15">
      <Text className="text-[var(--accent-11)]" size={"6"} weight={"medium"}>
        ميلوكود
      </Text>

      {!user && <RouteLink>ابدأ ←</RouteLink>}

      <Flex gap={"3"} align={"center"}>
        <Flex gap={"1"} align={"center"}>
          <Skeleton loading={isLoading}>
            <Text>{streak}</Text>
          </Skeleton>
          <Flame className="text-orange-700" size={24} />
        </Flex>

        {user && (
          <Skeleton loading={isLoading}>
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
          </Skeleton>
        )}
      </Flex>
    </nav>
  );
}
