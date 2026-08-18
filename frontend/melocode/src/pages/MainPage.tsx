import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { ProgressMap } from "../components/ProgressMap/ProgressMap";
import { useLessons } from "../hooks/api/lesson/useLessons";
import { useAuth } from "../contexts/AuthContext";
import { RouteLink } from "../components/shared/RouteLink";

export function MainPage() {
  const { lessons: nodes, isLoading, error } = useLessons();
  const { user } = useAuth();
  return (
    <main className="relative max-w-5xl w-full mx-auto p-6 md:p-12 border-x border-[var(--accent-6)] min-h-screen bg-[var(--gray-1)] selection:bg-[var(--accent-3)] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <Section className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-8 border-b border-dashed border-[var(--gray-5)]">
          <div className="space-y-2">
            <Heading
              size="8"
              weight="bold"
              mb={"4"}
              className="text-[var(--accent-11)] tracking-tight font-black"
            >
              مسار تطوير الويب
            </Heading>
            <p className="text-[var(--gray-11)] text-sm md:text-base max-w-xl leading-relaxed">
              رحلة تعليمية تفاعلية مصممة بعناية لمساعدتك في الانتقال من الصفر
              وحتى بناء وإطلاق مشاريع حقيقية متكاملة.
            </p>
            {!user && (
              <Flex
                gap="4"
                align="center"
                justify="between"
                p="3"
                className="bg-[var(--gray-2)] border border-[var(--gray-4)] rounded-[var(--radius-3)]"
              >
                <Flex gap="3" align="center">
                  <Box className="w-1.5 h-1.5 rounded-full bg-[var(--accent-9)]" />
                  <Flex direction="column" gap="1">
                    <Text size="3" weight="bold" highContrast>
                      أو جرب درساً !
                    </Text>
                    <Text size="2" color="gray">
                      سجل الدخول أو أنشئ حساباً جديداً للبدء
                    </Text>
                  </Flex>
                </Flex>
                <Box className="shrink-0">
                  <RouteLink> ابدأ ←</RouteLink>
                </Box>
              </Flex>
            )}
          </div>
        </div>

        <div className="px-2">
          <ProgressMap nodes={nodes} isLoading={isLoading} error={error} />
        </div>
      </Section>
    </main>
  );
}
