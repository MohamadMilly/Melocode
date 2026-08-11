import { Link, Text } from "@radix-ui/themes";

export function LessonContents({
  toc,
}: {
  toc: { text: string; slug: string }[];
}) {
  return (
    <nav className="w-full order-2 md:order-1 border-t md:border-t-0 md:border-r border-[var(--accent-6)] pt-4 md:pt-0 md:pr-4">
      <div className="sticky top-[calc(16px+64px)]">
        <Text
          as="p"
          className="font-semibold tracking-wider"
          size={"5"}
          mb={"4"}
        >
          محتويات الدرس
        </Text>
        <ul className="flex flex-col gap-3 ">
          {toc.map((link) => (
            <li
              key={link.slug}
              className="p-3 rounded-lg bg-[var(--gray-2)] hover:bg-[var(--gray-3)] transition-colors"
            >
              <Link
                href={link.slug}
                className="block text-sm font-medium text-[var(--gray-12)]"
              >
                {link.text}
              </Link>
            </li>
          ))}
          <li
            key={"الخلاصة"}
            className="p-3 rounded-lg bg-[var(--gray-2)] hover:bg-[var(--gray-3)] transition-colors"
          >
            <Link
              href={"#الخلاصة"}
              className="block text-sm font-medium text-[var(--gray-12)]"
            >
              الخلاصة
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
