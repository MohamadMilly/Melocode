import { Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

export function LessonText({ children }: { children: ReactNode }) {
  return (
    <Text as="p" mb={"3"} className="text-balance! leading-loose! w-full!">
      {children}
    </Text>
  );
}
