import { Flex } from "@radix-ui/themes";

import { OptionItem } from "./OptionItem";

export function OptionsList({ options }: { options: string[] }) {
  return (
    <Flex asChild direction="column" gap="2" my="4" className="w-full">
      <fieldset aria-label="Quiz options">
        {options.map((optionText, index) => (
          <OptionItem key={`${optionText}-${index}`} optionText={optionText} />
        ))}
      </fieldset>
    </Flex>
  );
}
