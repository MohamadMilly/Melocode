import { Button, Flex, Text } from "@radix-ui/themes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Lesson } from "@app/types";

export function NavigationCard({
  lesson,
  direction,
  disabled,
  onClick,
}: {
  lesson: Lesson;
  direction: "next" | "previous";
  disabled: boolean;
  onClick: () => void;
}) {
  const Arrow = direction === "next" ? ArrowRight : ArrowLeft;
  const directionLabel = direction === "next" ? "التالي" : "السابق";

  return (
    <Button
      variant="soft"
      size="4"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${directionLabel}: ${lesson.title}`}
      className={`h-auto! min-h-24! w-full! flex-1! justify-between! gap-4! whitespace-normal! rounded-[var(--radius-3)]! border px-5! py-4! text-[var(--gray-12)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--accent-7)] hover:bg-[var(--accent-2)] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none`}
    >
      <Flex align="center" gap="4" className="min-w-0">
        <Flex
          align="center"
          justify="center"
          className="shrink-0 rounded-full bg-[var(--accent-3)] p-2.5 text-[var(--accent-11)]"
        >
          <Arrow size={20} aria-hidden="true" />
        </Flex>
        <Flex direction="column" align="start" gap="1" className="min-w-0">
          <Text size="2" color="gray">
            {directionLabel}
          </Text>
          <Text
            size="3"
            weight="bold"
            className="line-clamp-2 text-start leading-snug text-[var(--gray-12)]"
          >
            {lesson.title}
          </Text>
        </Flex>
      </Flex>
    </Button>
  );
}
