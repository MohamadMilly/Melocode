import type { LeaderBoardUser, SortMetric } from "@app/types";
import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import { BookOpenCheck, CheckCircle2, Flame } from "lucide-react";
import { getAvatarFullBack } from "../../utils/getAvatarFullback";
import { useAuth } from "../../contexts/AuthContext";

const metricDetails: Record<SortMetric, { label: string; icon: typeof Flame }> =
  {
    submissions: { label: "إجابة صحيحة", icon: CheckCircle2 },
    progress: { label: "درس مكتمل", icon: BookOpenCheck },
    streak: { label: "يوم متواصل", icon: Flame },
  };

function getMetricCount(user: LeaderBoardUser, metric: SortMetric) {
  if (metric === "progress") {
    return user.lessonProgressesCount ?? user._count?.lessonProgresses ?? 0;
  }
  if (metric === "submissions") {
    return user.submissionsCount ?? user._count?.submissions ?? 0;
  }
  return user.streak ?? 0;
}

export function UserItem({
  user,
  rank,
  metric,
}: {
  user: LeaderBoardUser;
  rank: number;
  metric: SortMetric;
}) {
  const { user: inStorageUser } = useAuth();
  const isCurrentUser = user.id === inStorageUser?.id;
  const details = metricDetails[metric];
  const MetricIcon = details.icon;

  return (
    <Card
      size="2"
      className={`border border-[var(--gray-5)] ${isCurrentUser ? "bg-[var(--accent-2)]" : "bg-[var(--gray-2)]"} transition-colors hover:border-[var(--accent-7)]`}
    >
      <Flex align="center" gap="3">
        <Text
          size="4"
          weight="bold"
          color={rank <= 3 ? "lime" : "gray"}
          className="w-7 text-center"
        >
          {rank}
        </Text>
        <Avatar
          size="4"
          src={user.profile?.avtarUrl}
          fallback={getAvatarFullBack(user.fullname)}
        />
        <Flex direction="column" gap="1" className="min-w-0 flex-1">
          <Text weight="bold" truncate>
            {user.fullname} {isCurrentUser ? "(أنت)" : ""}
          </Text>
          <Text size="2" color="gray" truncate>
            @{user.username}
          </Text>
        </Flex>
        <Flex align="center" gap="2" className="shrink-0">
          <MetricIcon
            size={18}
            className="text-[var(--accent-11)]"
            aria-hidden="true"
          />
          <Flex direction="column" align="end" gap="0">
            <Text size="4" weight="bold">
              {getMetricCount(user, metric)}
            </Text>
            <Text size="1" color="gray">
              {details.label}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
