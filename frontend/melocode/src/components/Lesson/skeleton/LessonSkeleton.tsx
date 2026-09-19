import { Flex, Heading, Skeleton } from "@radix-ui/themes";
import { PageMain } from "../../shared/PageMain";

export function LessonSkeleton() {
  return (
    <PageMain
      className="grid max-w-full! w-full! h-full grid-cols-1 gap-4! px-1! sm:px-3! md:grid-cols-[auto_1fr] md:px-2!"
      showGrid={false}
      aria-label="جاري تحميل الدرس"
    >
      <aside className="hidden h-[calc(100vh-55px)] border-l border-[var(--gray-4)] bg-[var(--gray-1)] p-5 md:block md:w-80">
        <Flex direction="column" gap="4">
          <Skeleton width="150px" height="28px" />
          <Skeleton width="100%" height="18px" />
          <Skeleton width="85%" height="18px" />
          <Skeleton width="92%" height="18px" />
          <Skeleton width="70%" height="18px" />
        </Flex>
      </aside>

      <main className="h-full max-w-4xl mx-auto w-full order-1 md:order-2 min-h-0 overflow-hidden py-12 p-2 md:py-16 md:p-4">
        <Flex direction="column" gap="4">
          <Skeleton width="65%" height="48px" />
          <Skeleton width="100%" height="22px" />
          <Skeleton width="92%" height="22px" />
          <Skeleton width="78%" height="22px" />

          <Heading size="5" mt="5" className="text-[var(--accent-11)]">
            <Skeleton width="130px" height="28px" />
          </Heading>
          <Skeleton width="100%" height="180px" />
          <Skeleton width="96%" height="22px" />
          <Skeleton width="84%" height="22px" />
          <Skeleton width="72%" height="22px" />

          <Flex direction="column" align="center" gap="3" mt="6">
            <Skeleton width="100%" height="220px" />
            <Skeleton width="150px" height="44px" />
          </Flex>
        </Flex>
      </main>
    </PageMain>
  );
}
