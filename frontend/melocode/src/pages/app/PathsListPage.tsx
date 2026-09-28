import { Box, Flex, Heading, Section, Spinner, Text } from "@radix-ui/themes";
import { ArrowLeft, Map } from "lucide-react";
import { Link } from "react-router";
import { usePaths } from "../../hooks/api/path/usePaths";
import { PageMain } from "../../components/shared/layout/PageMain";
import { ErrorElement } from "../../components/shared/ui/ErrorElement";

export function PathsListPage() {
  const { paths, isLoading, error } = usePaths();

  return (
    <PageMain className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:px-8">
      <Section size="2" py="6" className="relative z-5">
        <Flex direction="column" gap="2" mb="7">
          <Flex align="center" gap="2" className="text-(--accent-11)">
            <Map size={17} aria-hidden="true" />
            <Text size="2" weight="bold">
              مسارات التعلم
            </Text>
          </Flex>
          <Heading size="7" weight="bold" className="text-(--accent-11)">
            اختر مسارك
          </Heading>
          <Text as="p" size="3" color="gray">
            ابدأ رحلة تعلم جديدة أو تابع تقدّمك.
          </Text>
        </Flex>

        {isLoading ? (
          <Flex justify="center" py="8">
            <Spinner size="3" />
          </Flex>
        ) : error ? (
          <ErrorElement axiosError={error} />
        ) : paths.length === 0 ? (
          <Text as="p" color="gray" my={"4"}>
            لا توجد مسارات متاحة حالياً.
          </Text>
        ) : (
          <Box className="border-y border-(--gray-5)">
            {paths.map((path) => (
              <Link
                key={path.id}
                to={`/app/paths/${path.slug}`}
                className="group block border-b border-(--gray-4) last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-8)"
              >
                <Flex
                  align="center"
                  justify="between"
                  gap="4"
                  py="5"
                  px={{ initial: "2", sm: "4" }}
                  className="transition-colors group-hover:bg-(--accent-2)"
                >
                  <Text
                    size="4"
                    weight="bold"
                    className="text-(--gray-12) transition-colors group-hover:text-(--accent-11)"
                  >
                    {path.title}
                  </Text>
                  <ArrowLeft
                    size={19}
                    className="shrink-0 text-(--accent-9) transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </Flex>
              </Link>
            ))}
          </Box>
        )}
      </Section>
    </PageMain>
  );
}
