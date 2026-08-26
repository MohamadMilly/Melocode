import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Flex, Heading, Section, Text } from "@radix-ui/themes";
import { Trophy } from "lucide-react";
import { useUsers } from "../../hooks/api/user/useUsers";
import { LeaderBoardControls } from "../../components/LeaderBoard/LeaderBoardControls";
import { UserList } from "../../components/LeaderBoard/UserList";
import type { LeaderBoardUser } from "@app/types";
import type {
  LeaderboardSortOrder,
  SortDirection,
  SortMetric,
} from "@app/types";

export function UsersLeaderBoardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = (searchParams.get("sortBy") ??
    "-submissions") as LeaderboardSortOrder;
  const direction = sortBy.startsWith("+") ? "+" : "-";
  const metric = sortBy.slice(1) as SortMetric;
  const { users, isLoading, error } = useUsers(sortBy);

  useEffect(() => {
    if (!sortBy) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("sortBy", "-submissions");
        return next;
      });
    }
  }, [setSearchParams, sortBy]);

  const handleSortByChange = useCallback(
    (nextMetric: SortMetric, nextDirection: SortDirection) => {
      const newSortBy = `${nextDirection}${nextMetric}` as LeaderboardSortOrder;
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("sortBy", newSortBy);
        return next;
      });
    },
    [setSearchParams],
  );

  return (
    <main
      dir="rtl"
      className="relative max-w-5xl mx-auto min-h-screen overflow-hidden border-x border-[var(--gray-4)] bg-[var(--gray-1)] px-4 sm:px-6 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      <Section size="2" className="relative z-10">
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
              مجتمع ميلوكود
            </Text>
            <Heading
              size={{ initial: "7", md: "8" }}
              className="flex items-center gap-3 text-[var(--accent-11)]"
            >
              <Trophy size={34} aria-hidden="true" /> لوحة المتصدرين
            </Heading>
            <Text as="p" size="3" color="gray">
              تابع تقدم المتعلمين واكتشف ترتيبك في المجتمع.
            </Text>
          </Flex>
          <LeaderBoardControls
            metric={metric}
            direction={direction}
            onMetricChange={(nextMetric) =>
              handleSortByChange(nextMetric, direction)
            }
            onDirectionChange={(nextDirection) =>
              handleSortByChange(metric, nextDirection)
            }
          />
          {error ? (
            <Text color="red">تعذر تحميل لوحة المتصدرين.</Text>
          ) : (
            <UserList
              users={users as LeaderBoardUser[]}
              metric={metric}
              isLoading={isLoading}
            />
          )}
        </Flex>
      </Section>
    </main>
  );
}
