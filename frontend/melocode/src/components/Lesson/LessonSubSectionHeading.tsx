import { Heading, type HeadingProps } from "@radix-ui/themes";

export function LessonSubSectionHeading({ children, ...props }: HeadingProps) {
  return (
    <Heading
      {...props}
      size={"5"}
      my={"6"}
      as="h3"
      className="border-b-4 border-[var(--accent-6)] pb-4 w-fit"
    >
      {children}
    </Heading>
  );
}
