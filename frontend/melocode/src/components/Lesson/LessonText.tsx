import { Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

export function LessonText({ children }: { children: ReactNode }) {
  return (
    <Text as="p" mb={"4"} className="whitespace-pre-wrap leading-loose!">
      {children}
    </Text>
  );
}
