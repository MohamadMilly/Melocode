import { Flex, Heading, Section, Text } from "@radix-ui/themes";
import { Trophy } from "lucide-react";
import { AchievementsList } from "../../components/Achievement/AchievementsList";
import { PageMain } from "../../components/shared/PageMain";
import { useMyAchievements } from "../../hooks/api/me/useMyAchievements";

export function AchievementsPage() {
  const { achievements, isLoading, error } = useMyAchievements();

  return (
    <PageMain>
      <Section size="2" className="relative z-10">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
              تقدمك في ميلوكود
            </Text>
            <Heading
              size={{ initial: "7", md: "8" }}
              className="flex items-center gap-3 text-[var(--accent-11)]"
            >
              <Trophy size={34} aria-hidden="true" /> إنجازاتك
            </Heading>
            <Text as="p" size="3" color="gray">
              اكتسب إنجازات جديدة عندما تكمل الدروس، تحل الاختبارات، وتستمر في
              تعلمك بشكل منتظم.
            </Text>
          </Flex>

          <AchievementsList
            achievements={achievements}
            isLoading={isLoading}
            error={error}
          />
        </Flex>
      </Section>
    </PageMain>
  );
}
