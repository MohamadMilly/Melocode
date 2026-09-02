import { Heading } from "@radix-ui/themes";
import type { ReactNode } from "react";

export function LessonConclusionHeading({ children }: { children: ReactNode }) {
  return (
    <Heading
      size={"5"}
      mt={"8"}
      mb={"4"}
      as="h4"
      id="الخلاصة"
      className="border-b-4 border-[var(--accent-6)] pb-4 w-fit text-[var(--accent-11)]"
    >
      {children}
    </Heading>
  );
}
