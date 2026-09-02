import { Badge, type BadgeProps } from "@radix-ui/themes";
import type { QuizLevelType } from "../../shared/types/Quiz.types";

const LEVELS_VARIANT: Record<QuizLevelType, BadgeProps["color"]> = {
  easy: "green",
  medium: "orange",
  hard: "crimson",
};

export function QuizLevelBadge({
  level,
  className = "",
}: {
  className?: string;
  level: QuizLevelType;
}) {
  const currentVariant = LEVELS_VARIANT[level];
  return (
    <Badge color={currentVariant} className={`capitalize ${className}`}>
      {level}
    </Badge>
  );
}
