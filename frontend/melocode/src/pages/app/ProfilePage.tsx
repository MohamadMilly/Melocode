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
import { ErrorElement } from "../../components/shared/ui/ErrorElement";
import { ProfileSkeleton } from "../../components/Profile/skeleton/ProfileSkeleton";
import { PageMain } from "../../components/shared/PageMain";

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
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <PageMain className="mx-auto max-w-5xl px-4 py-12">
        <ErrorElement axiosError={error} />
      </PageMain>
    );
  }
  if (!user) {
    return (
      <PageMain className="mx-auto max-w-5xl px-4 py-12">
        <Text>لم يتم إيجاد الملف الشخصي .</Text>
      </PageMain>
    );
  }
  const avatarFallback = getAvatarFullBack(user.fullname as string);
  const joinedDate = new Date(user.createdAt).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
  });

  return (
    <PageMain>
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
    </PageMain>
  );
}
