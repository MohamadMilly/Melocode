import { Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

export function HighLight({ children }: { children: ReactNode }) {
  return (
    <Text
      as="span"
      className="bg-[var(--accent-9)]/20 rounded-lg py-[1px] px-1"
    >
      {children}
    </Text>
  );
}
