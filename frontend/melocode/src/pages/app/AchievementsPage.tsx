import { Flex, Heading, Section, Text } from "@radix-ui/themes";
import { Trophy } from "lucide-react";
import { AchievementsList } from "../../components/Achievement/AchievementsList";
import { useMyAchievements } from "../../hooks/api/me/useMyAchievements";

export function AchievementsPage() {
  const { achievements, isLoading, error } = useMyAchievements();

  return (
    <main
      dir="rtl"
      className="relative mx-auto min-h-screen w-full max-w-5xl overflow-hidden border-x border-[var(--gray-4)] bg-[var(--gray-1)] px-4 sm:px-6 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

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
    </main>
  );
}
