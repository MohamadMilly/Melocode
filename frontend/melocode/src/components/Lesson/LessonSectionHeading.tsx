import { Heading, type HeadingProps } from "@radix-ui/themes";

export function LessonSectionHeading({ children, ...props }: HeadingProps) {
  return (
    <Heading
      {...props}
      size={"6"}
      my={"6"}
      as="h2"
      className="border-b-4 border-[var(--accent-6)] pb-4 w-fit"
    > 
      {children}
    </Heading>
  );
}
