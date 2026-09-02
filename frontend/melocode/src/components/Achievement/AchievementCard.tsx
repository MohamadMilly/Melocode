import type { Achievement } from "@app/types";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Sparkles } from "lucide-react";
import {
  achievementImages,
  frequencyLabels,
} from "../../shared/constants/achievement";

const scopeLabels = {
  SUBMISSION: "الإجابات الصحيحة",
  PROGRESS: "الدروس المكتملة",
  STREAK: "السلسلة",
} as const;

type AchievementCardProps = {
  achievement: Achievement;
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  const image = achievementImages[achievement.scope][achievement.frequency];
  const title = frequencyLabels[achievement.scope][achievement.frequency];
  const gainedDate = new Date(achievement.gainedAt).toLocaleDateString(
    "ar-EG",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Card
      size="3"
      className="border border-[var(--gray-5)] bg-[var(--gray-2)] transition-transform duration-200 hover:-translate-y-1"
    >
      <Flex direction="column" align="center" gap="3" p="1">
        <Box className="rounded-full bg-[var(--accent-3)] p-3">
          <img src={image} alt={title} className="h-28 w-28 object-contain" />
        </Box>

        <Flex direction="column" align="center" gap="1">
          <Text size="2" color="gray">
            {scopeLabels[achievement.scope]}
          </Text>
          <Text size="4" weight="bold" align="center">
            {title}
          </Text>
        </Flex>

        <Flex
          align="center"
          gap="2"
          className="rounded-full border border-[var(--accent-6)] bg-[var(--accent-3)] px-3 py-1"
        >
          <Sparkles size={16} className="text-[var(--accent-11)]" />
          <Text size="2" weight="medium" className="text-[var(--accent-11)]">
            تم الحصول عليه في {gainedDate}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
