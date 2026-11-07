import type { Path } from "@app/types";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowLeft, Map } from "lucide-react";
import { Link } from "react-router";

type PathItemProps = {
  path: Path;
};

export function PathItem({ path }: PathItemProps) {
  return (
    <Link
      to={`/app/paths/${path.slug}`}
      className="group block h-full rounded-(--radius-3) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-8)"
    >
      <Card
        size="3"
        className="flex h-full min-h-52 flex-col border border-(--gray-5) bg-(--gray-2) transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out group-hover:-translate-y-1 group-hover:border-(--accent-7) group-hover:bg-(--accent-2) group-hover:shadow-md motion-reduce:transition-none"
      >
        <Flex direction="column" gap="4" className="h-full">
          <Flex align="center" justify="between" gap="3">
            <Flex
              align="center"
              justify="center"
              className="size-10 shrink-0 rounded-full bg-(--accent-3) text-(--accent-11) transition-colors group-hover:bg-(--accent-4)"
            >
              <Map size={19} aria-hidden="true" />
            </Flex>
            <ArrowLeft
              size={19}
              className="shrink-0 text-(--accent-9) transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Flex>

          <Flex direction="column" gap="2" className="flex-1">
            <Heading
              size="4"
              weight="bold"
              className="text-(--gray-12) transition-colors group-hover:text-(--accent-11)"
            >
              {path.title}
            </Heading>
            {path.description && (
              <Text
                as="p"
                size="2"
                color="gray"
                className="line-clamp-3 leading-relaxed"
              >
                {path.description}
              </Text>
            )}
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
}
