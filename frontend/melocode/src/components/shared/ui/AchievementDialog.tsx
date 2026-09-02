import { AlertDialog, Badge, Button, Flex, Text } from "@radix-ui/themes";
import { Sparkles } from "lucide-react";
import type { Achievement } from "@app/types";
import {
  achievementImages,
  frequencyLabels,
} from "../../../shared/constants/achievement";

type AchievementDialogProps = {
  achievement: Achievement | null;
  onOpenChange: (open: boolean) => void;
};

export function AchievementDialog({
  achievement,
  onOpenChange,
}: AchievementDialogProps) {
  const achievementMessage = achievement
    ? frequencyLabels[achievement.scope][achievement.frequency]
    : "";

  return (
    <AlertDialog.Root open={achievement !== null} onOpenChange={onOpenChange}>
      <AlertDialog.Content
        maxWidth="560px"
        align="center"
        className="border-2 border-[var(--accent-8)] bg-[var(--accent-2)] px-8 py-10 shadow-[0_24px_70px_rgba(0,0,0,0.3)]"
      >
        <Flex direction="column" align="center" gap="5">
          <Badge size="2" color="lime" variant="soft">
            <Sparkles size={16} /> إنجاز جديد!
          </Badge>
          <Text
            size="8"
            weight="bold"
            align="center"
            className="text-[var(--accent-11)]"
          >
            أحسنت!
          </Text>
          {achievement && (
            <img
              src={achievementImages[achievement.scope][achievement.frequency]}
              alt={`إنجاز ${achievementMessage}`}
              className="h-56 w-56 object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.35)]"
            />
          )}
          <Text size="5" weight="bold" align="center">
            {achievement && achievementMessage}
          </Text>
          <AlertDialog.Action>
            <Button size="3" onClick={() => onOpenChange(false)}>
              متابعة التعلم
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
