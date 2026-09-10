import { Badge, type BadgeProps } from "@radix-ui/themes";
import type { QuizBadgeType } from "../../shared/types/Quiz.types";

const BADGE_VARIANTS: Record<QuizBadgeType, BadgeProps["color"]> = {
  Write: "green",
  Debug: "orange",
  Fix: "crimson",
  Theory: "blue",
  "Multiple Choice": "lime",
};

type QuizBadgeProps = {
  badge: QuizBadgeType;
  className?: string;
};

export function QuizTypeBadge({ badge, className = "" }: QuizBadgeProps) {
  const currentVariant = BADGE_VARIANTS[badge] ?? "blue";

  return (
    <Badge size="1" color={currentVariant} className={className}>
      {badge}
    </Badge>
  );
}
