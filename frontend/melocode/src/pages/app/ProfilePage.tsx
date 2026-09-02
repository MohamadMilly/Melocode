import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { Flame, UserRound } from "lucide-react";
import { useMe } from "../../hooks/api/me/useMe";
import { getAvatarFullBack } from "../../shared/utils/getAvatarFullback";
import { useAuth } from "../../contexts/AuthContext";
import { useUserProgresses } from "../../hooks/api/progress/useUserProgress";
import { StreakBarChart } from "../../components/Profile/StreakBarChart";
import { ProgressCircleChart } from "../../components/Profile/ProgressCircleChart";

export function ProfilePage() {
  const { user: userInStorage } = useAuth();
  const { user, isLoading, error } = useMe();
  const {
    progresses,
    progressFraction,
    isLoading: isLoadingProgresses,
    error: progressesFetchError,
  } = useUserProgresses(userInStorage?.id as number);

  if (isLoading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Text color="gray">جاري تحميل الملف الشخصي...</Text>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Text color="gray">تعذر تحميل الملف الشخصي.</Text>
      </main>
    );
  }

  const avatarFallback = getAvatarFullBack(user.fullname as string);
  const joinedDate = new Date(user.createdAt).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
  });

  return (
    <main
      dir="rtl"
      className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 border-x border-[var(--gray-4)] min-h-screen bg-[var(--gray-1)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_left,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <Section size="2" className="relative z-10">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
              حسابك في ميلوكود
            </Text>
            <Heading
              size={{ initial: "7", md: "8" }}
              className="text-[var(--accent-11)]"
            >
              الملف الشخصي
            </Heading>
          </Flex>

          <Card
            size="3"
            className="border border-[var(--gray-5)] bg-[var(--gray-2)]"
          >
            <Flex
              direction={{ initial: "column", sm: "row" }}
              gap="5"
              align="center"
            >
              <Avatar
                size="7"
                src={user.profile?.avtarUrl}
                fallback={avatarFallback}
              />
              <Flex
                direction="column"
                gap="1"
                align={{ initial: "center", sm: "start" }}
              >
                <Heading size="5">{user.fullname}</Heading>
                <Text color="gray">@{user.username}</Text>
                <Text size="2" color="gray">
                  عضو منذ {joinedDate}
                </Text>
              </Flex>
            </Flex>
          </Card>

          <Flex direction={{ initial: "column", sm: "row" }} gap="4">
            <Box className="flex-1">
              <Card size="2" className="h-full border border-[var(--gray-5)]">
                <Flex gap="3" align="center">
                  <Flame className="text-orange-700" size={24} />
                  <Flex direction="column" gap="1">
                    <Text size="2" color="gray">
                      سلسلة التعلم
                    </Text>
                    <Text size="6" weight="bold">
                      {user.streak}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Box>
            <Box className="flex-1">
              <Card size="2" className="h-full border border-[var(--gray-5)]">
                <Flex gap="3" align="center">
                  <UserRound className="text-[var(--accent-11)]" size={24} />
                  <Flex direction="column" gap="1">
                    <Text size="2" color="gray">
                      اسم المستخدم
                    </Text>
                    <Text size="4" weight="bold">
                      @{user.username}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Box>
          </Flex>
          <Flex wrap={"wrap"} gap={"2"}>
            <ProgressCircleChart fraction={progressFraction} />
            <StreakBarChart userLessonProgresses={progresses} />
          </Flex>
        </Flex>
      </Section>
    </main>
  );
}
