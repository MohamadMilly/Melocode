import { Flex, Heading, Section, Spinner, Text } from "@radix-ui/themes";
import { Map } from "lucide-react";
import { usePaths } from "../../hooks/api/path/usePaths";
import { PageMain } from "../../components/shared/layout/PageMain";
import { ErrorElement } from "../../components/shared/ui/ErrorElement";
import { PathList } from "../../components/Path/PathList";

export function PathsListPage() {
  const { paths, isLoading, error } = usePaths();

  return (
    <PageMain className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-8">
      <Section size="2" py="6" className="relative z-5">
        <Flex direction="column" gap="2" mb="7">
          <Flex align="center" gap="2" className="text-(--accent-11)">
            <Map size={17} aria-hidden="true" />
            <Text size="2" weight="bold">
              مسارات التعلم
            </Text>
          </Flex>
          <Heading size="8" weight="bold" className="text-(--accent-11)">
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
          <PathList paths={paths} />
        )}
      </Section>
    </PageMain>
  );
}
