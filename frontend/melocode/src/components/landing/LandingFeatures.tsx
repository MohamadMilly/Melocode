import { Flex, Heading, Text } from "@radix-ui/themes";
import { features } from "../../shared/constants/features";

export function LandingFeatures() {
  return (
    <section
      className="border-t border-[color-mix(in_srgb,var(--gray-7)_18%,transparent)] py-14 pb-20"
      aria-labelledby="features-title"
    >
      <div className="mb-8 grid gap-2">
        <Text size="2" weight="bold" color="lime">
          لماذا ميلوكود؟
        </Text>
        <Heading id="features-title" size="7">
          كل ما تحتاجه لتبدأ بثقة
        </Heading>
      </div>

      <div className="grid grid-cols-1 gap-6 divide-y-1 divide-[color-mix(in_srgb,var(--gray-7)_18%,transparent)]">
        {features.map(({ icon: Icon, image, title, description }) => (
          <Flex
            align={"start"}
            key={title}
            gap={"2"}
            className="flex w-full flex-row overflow-hidden max-sm:flex-col pb-6"
          >
            <div className="w-2/3 shrink-0 overflow-hidden rounded-md border border-[var(--gray-8)] bg-[var(--gray-2)] p-2 max-sm:w-full">
              <img
                src={image}
                alt=""
                className="h-full w-full rounded-sm object-contain object-center max-sm:max-h-[220px]"
              />
            </div>
            <div className="flex flex-1 items-center p-4">
              <Flex gap="3" align="start">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-3)] bg-[var(--accent-3)] text-[var(--accent-11)]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <Heading as="h3" size="4" mb="1">
                    {title}
                  </Heading>
                  <Text as="p" size="2" color="gray">
                    {description}
                  </Text>
                </div>
              </Flex>
            </div>
          </Flex>
        ))}
      </div>
    </section>
  );
}
