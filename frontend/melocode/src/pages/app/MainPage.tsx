import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { ProgressMap } from "../../components/ProgressMap/ProgressMap";
import { useLessons } from "../../hooks/api/lesson/useLessons";
import { useAuth } from "../../contexts/AuthContext";
import { RouteLink } from "../../components/shared/ui/RouteLink";
import { PageMain } from "../../components/shared/PageMain";
import { MainSideNav } from "../../components/Main/MainSideNav";
import { CheckCircle2, Flag, Sparkles } from "lucide-react";

export function MainPage() {
  const { lessons: nodes, isLoading, error } = useLessons();
  const { user } = useAuth();

  const currentLesson = nodes.find((node) => node.status === "current");

  return (
    <PageMain className="grid! max-w-full! pt-0! mt-0!  w-full! grid-cols-1! grid-rows-1! gap-y-! px-2! selection:bg-(--accent-a3)! sm:px-3! md:grid-cols-[auto_1fr]!">
      <Section
        size="2"
        p={{
          initial: "4",
          sm: "6",
          lg: "9",
        }}
        mt={"3"}
        className="relative flex! flex-col! md:flex-row! gap-8! items-stretch! z-10 col-start-2 col-end-3 row-start-1 row-end-2"
      >
        <Flex
          direction="column"
          gap="6"
          className="w-full basis-100 shrink-0 border-b border-dashed border-(--gray-5) pb-6 md:w-80 md:border-b-0 md:border-l md:pl-8"
        >
          <Flex direction="column" gap="3" className="max-w-2xl md:max-w-none">
            <Flex align="center" gap="2" className="text-(--accent-11)">
              <Sparkles size={16} strokeWidth={2.25} aria-hidden="true" />
              <Text size="2" weight="bold">
                خريطة رحلتك التعليمية
              </Text>
            </Flex>
            <Heading
              size={{ initial: "7", md: "8" }}
              weight="bold"
              className="text-(--accent-11) tracking-tight font-black"
            >
              مسار تطوير الويب
            </Heading>

            <Text as="p" size="3" color="gray" className="leading-relaxed">
              رحلة تعليمية تفاعلية مصممة بعناية لمساعدتك في الانتقال من الصفر
              وحتى بناء وإطلاق مشاريع حقيقية متكاملة.
            </Text>

            <Flex
              direction={{ initial: "column", sm: "row" }}
              align={{ initial: "stretch", sm: "center" }}
              gap="4"
              p="3"
              mt="2"
              className="border border-(--accent-5) bg-(--accent-2)/45 rounded-(--radius-3)"
            >
              <Flex align="center" gap="3" className="min-w-0 flex-1">
                <Flex
                  align="center"
                  justify="center"
                  className="h-9 w-9 shrink-0 rounded-full bg-(--accent-4) text-(--accent-11)"
                >
                  <Flag size={17} aria-hidden="true" />
                </Flex>
                <Flex direction="column" gap="1" className="min-w-0">
                  <Text size="2" weight="bold" highContrast>
                    {currentLesson
                      ? `الدرس الحالي: ${currentLesson.title}`
                      : "ابدأ أول خطوة في رحلتك"}
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            {!user && (
              <Flex
                gap="4"
                align="center"
                justify="between"
                p="4"
                mt="2"
                className="bg-(--gray-2) border border-(--gray-4) rounded-(--radius-3) shadow-xs"
              >
                <Flex gap="3" align="center">
                  <CheckCircle2
                    className="text-(--accent-9) shrink-0"
                    size={19}
                    aria-hidden="true"
                  />
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

        <Box className="min-w-0 flex-1!" px={{ initial: "0", sm: "2" }}>
          <ProgressMap nodes={nodes} isLoading={isLoading} error={error} />
        </Box>
      </Section>
      <MainSideNav nodes={nodes} />
    </PageMain>
  );
}
