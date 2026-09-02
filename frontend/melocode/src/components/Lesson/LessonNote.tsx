import { Box, Flex, Text } from "@radix-ui/themes";
import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

export function LessonNote({ children }: { children: ReactNode }) {
  return (
    <Box
      my={"4"}
      p={"3"}
      className="bg-[var(--accent-2)] border-r-4 border-[var(--accent-6)] w-full"
    >
      <Flex className="text-[var(--accent-11)]" justify={"start"} gap={"1"}>
        <Lightbulb size={24} />
        <Text>ملاحظة</Text>
      </Flex>
      <Box className="text-balance">{children}</Box>
    </Box>
  );
}
