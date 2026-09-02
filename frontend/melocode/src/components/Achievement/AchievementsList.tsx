import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import { Award } from "lucide-react";
import type { Achievement } from "@app/types";
import { AchievementCard } from "./AchievementCard";
import { AchievementSkeleton } from "./skeleton/AchievementSkeleton";

type AchievementsListProps = {
  achievements: Achievement[];
  isLoading: boolean;
  error?: unknown;
};

export function AchievementsList({
  achievements,
  isLoading,
  error,
}: AchievementsListProps) {
  if (error) {
    return <Text color="red">تعذر تحميل الإنجازات.</Text>;
  }

  if (isLoading) {
    return <AchievementSkeleton count={4} />;
  }
   
  if (achievements.length === 0) {
    return (
      <Card
        size="3"
        className="border border-dashed border-[var(--gray-5)] bg-[var(--gray-2)]"
      >
        <Flex direction="column" align="center" gap="3" py="8">
          <Award className="text-[var(--accent-11)]" size={48} />
          <Text size="5" weight="bold">
            لا توجد إنجازات بعد
          </Text>
          <Text color="gray" align="center">
            ابدأ رحلتك اليوم، وأكمل الدروس والاختبارات لتفتح إنجازاتك الأولى.
          </Text>
        </Flex>
      </Card>
    );
  }

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="4">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </Grid>
  );
}
