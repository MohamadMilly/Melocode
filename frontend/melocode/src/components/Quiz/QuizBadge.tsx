import { Text } from "@radix-ui/themes";

export type QuizBadgeType = "Write" | "Debug" | "Fix" | "Theory";

const BADGE_STYLES: Record<QuizBadgeType, string> = {
  Write: "bg-green-600 text-green-100",
  Debug: "bg-yellow-600 text-yellow-100 ",
  Fix: "bg-red-600 text-red-100",
  Theory: "bg-gray-600 text-gray-100",
};

type QuizBadgeProps = {
  badge: QuizBadgeType;
  className?: string;
};

export function QuizBadge({ badge, className = "" }: QuizBadgeProps) {
  const currentStyle = BADGE_STYLES[badge] || "bg-gray-600 text-gray-100";

  return (
    <Text
      as="span"
      className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-md uppercase tracking-wider transition-colors ${currentStyle} ${className}`}
    >
      {badge}
    </Text>
  );
}
