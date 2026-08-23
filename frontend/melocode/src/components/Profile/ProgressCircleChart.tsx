import type { JSX } from "react/jsx-runtime";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useEffect } from "react";

export function ProgressCircleChart({
  fraction,
}: {
  fraction: number;
}): JSX.Element {
  const percent = Math.min(
    100,
    Math.max(0, Number((fraction * 100).toFixed(0))),
  );

  return (
    <Card
      size="3"
      className="flex min-h-72 min-w-64 flex-1 items-center justify-center border border-[var(--gray-5)] bg-[var(--gray-2)]"
    >
      <Flex direction="column" align="center" gap="5">
        <Flex direction="column" align="center" gap="1">
          <Heading size="5">مؤشر إكمال الدروس</Heading>
          <Text size="2" color="gray">
            نسبة الدروس التي أنجزتها
          </Text>
        </Flex>

        <div
          className="relative size-40"
          role="img"
          aria-label={`${percent}% من الدروس مكتملة`}
        >
          <svg
            className="size-full -rotate-90"
            viewBox="0 0 120 120"
            aria-hidden="true"
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="var(--gray-5)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="var(--accent-9)"
              strokeWidth="10"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray={`${percent} 100`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[var(--gray-12)]">
            {percent}%
          </span>
        </div>
      </Flex>
    </Card>
  );
}
