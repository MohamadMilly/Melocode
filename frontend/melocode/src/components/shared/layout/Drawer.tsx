import { Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type DrawerProps = {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right";
};

export function Drawer({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  side = "right",
}: DrawerProps) {
  const sideClasses =
    side === "left" ? "left-0 right-auto" : "right-0 left-auto";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content
        className={[
          "fixed inset-y-0 top-0 bottom-0 m-0 overflow-y-auto rounded-none border-[var(--gray-6)]/20 bg-[var(--color-panel)] p-5 shadow-2xl",
          sideClasses,
          "w-[85vw] max-w-sm border-l border-r-0 border-t-0 border-b-0",
          side === "left" ? "border-r" : "border-l",
        ].join(" ")}
        style={{
          inset: "0 auto 0 0",
          maxWidth: "none",
          width: "min(85vw, 24rem)",
        }}
      >
        <Flex justify="between" align="center" mb="4">
          {title ? (
            <Dialog.Title>
              <Text as="span" size="4" weight="bold">
                {title}
              </Text>
            </Dialog.Title>
          ) : (
            <div />
          )}

          <Dialog.Close>
            <IconButton variant="ghost" color="gray" aria-label="إغلاق القائمة">
              <X size={18} />
            </IconButton>
          </Dialog.Close>
        </Flex>

        {description ? (
          <Dialog.Description size="2" mb="4">
            {description}
          </Dialog.Description>
        ) : null}

        <Flex direction="column" gap="3">
          {children}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
