import { Box, Flex, Text } from "@radix-ui/themes";
import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

export function LessonNote({ children }: { children: ReactNode }) {
  return (
    <Box
      my={"5"}
      className="w-full border-r-4 border-[var(--accent-6)] bg-[var(--accent-2)] p-4 sm:p-5"
    >
      <Flex className="text-[var(--accent-11)]" justify={"start"} gap={"2"}>
        <Lightbulb size={22} />
        <Text>ملاحظة</Text>
      </Flex>
      <Box width={"100%"} className="mt-2 w-full leading-relaxed">
        {children}
      </Box>
    </Box>
  );
}
