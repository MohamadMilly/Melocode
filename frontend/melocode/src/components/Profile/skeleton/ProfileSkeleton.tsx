import { Avatar, Box, Card, Flex, Section, Skeleton } from "@radix-ui/themes";

export function ProfileSkeleton() {
  return (
    <main
      dir="rtl"
      aria-label="جاري تحميل الملف الشخصي"
      className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 border-x border-[var(--gray-4)] min-h-screen bg-[var(--gray-1)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_left,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <Section size="2" className="relative z-10">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Skeleton width="150px" height="18px" />
            <Skeleton width="210px" height="44px" />
          </Flex>

          <Card size="3" className="border border-[var(--gray-5)] bg-[var(--gray-2)]">
            <Flex
              direction={{ initial: "column", sm: "row" }}
              gap="5"
              align="center"
            >
              <Skeleton>
                <Avatar size="7" fallback="" />
              </Skeleton>
              <Flex
                direction="column"
                gap="2"
                align={{ initial: "center", sm: "start" }}
              >
                <Skeleton width="170px" height="24px" />
                <Skeleton width="120px" height="18px" />
                <Skeleton width="145px" height="16px" />
              </Flex>
            </Flex>
          </Card>

          <Flex direction={{ initial: "column", sm: "row" }} gap="4">
            <Box className="flex-1">
              <Card size="2" className="h-full border border-[var(--gray-5)]">
                <Flex gap="3" align="center">
                  <Skeleton width="24px" height="24px" />
                  <Flex direction="column" gap="2">
                    <Skeleton width="100px" height="16px" />
                    <Skeleton width="45px" height="28px" />
                  </Flex>
                </Flex>
              </Card>
            </Box>
            <Box className="flex-1">
              <Card size="2" className="h-full border border-[var(--gray-5)]">
                <Flex gap="3" align="center">
                  <Skeleton width="24px" height="24px" />
                  <Flex direction="column" gap="2">
                    <Skeleton width="100px" height="16px" />
                    <Skeleton width="120px" height="22px" />
                  </Flex>
                </Flex>
              </Card>
            </Box>
          </Flex>

          <Flex wrap="wrap" gap="2">
            <Skeleton width="220px" height="220px" />
            <Skeleton width="100%" height="220px" />
          </Flex>
        </Flex>
      </Section>
    </main>
  );
}