import { Heading } from "@radix-ui/themes";
import type { ReactNode } from "react";

export function LessonTitle({ children }: { children: ReactNode }) {
  return (
    <Heading
      size={"8"}
      mb={"8"}
      weight={"medium"}
      className="tracking-tight text-[var(--accent-11)]"
    >
      {children}
    </Heading>
  );
}
