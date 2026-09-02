import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { ProgressMap } from "../../components/ProgressMap/ProgressMap";
import { useLessons } from "../../hooks/api/lesson/useLessons";
import { useAuth } from "../../contexts/AuthContext";
import { RouteLink } from "../../components/shared/ui/RouteLink";

export function MainPage() {
  const { lessons: nodes, isLoading, error } = useLessons();
  const { user } = useAuth();

  return (
    <main
      dir="rtl"
      className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 border-x border-[var(--gray-4)] min-h-screen bg-[var(--gray-1)] selection:bg-[var(--accent-a3)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_left,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <Section size="2" className="relative z-10">
        <Flex
          direction={{ initial: "column", md: "row" }}
          align={{ initial: "stretch", md: "center" }}
          justify="between"
          gap="6"
          pb="6"
          mb="8"
          className="border-b border-dashed border-[var(--gray-5)]"
        >
          <Flex direction="column" gap="3" className="max-w-2xl">
            <Heading
              size={{ initial: "7", md: "8" }}
              weight="bold"
              className="text-[var(--accent-11)] tracking-tight font-black"
            >
              مسار تطوير الويب
            </Heading>

            <Text as="p" size="3" color="gray" className="leading-relaxed">
              رحلة تعليمية تفاعلية مصممة بعناية لمساعدتك في الانتقال من الصفر
              وحتى بناء وإطلاق مشاريع حقيقية متكاملة.
            </Text>

            {!user && (
              <Flex
                gap="4"
                align="center"
                justify="between"
                p="4"
                mt="2"
                className="bg-[var(--gray-2)] border border-[var(--gray-4)] rounded-[var(--radius-3)] shadow-xs"
              >
                <Flex gap="3" align="center">
                  <Box className="w-2 h-2 rounded-full bg-[var(--accent-9)] shrink-0" />
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
                  <RouteLink route="/login" tipContent="ابدأ">
                    ابدأ ←
                  </RouteLink>
                </Box>
              </Flex>
            )}
          </Flex>
        </Flex>
         
        <Box px={{ initial: "1", sm: "2" }}>
          <ProgressMap nodes={nodes} isLoading={isLoading} error={error} />
        </Box>
      </Section>
    </main>
  );
}
