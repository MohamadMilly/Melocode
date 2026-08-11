import { Box, Flex, Text } from "@radix-ui/themes";
import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

export function LessonNote({ children }: { children: ReactNode }) {
  return (
    <Box
      my={"4"}
      p={"3"}
      className="bg-blue-500/20 border-r-4 border-blue-600 w-full"
    >
      <Flex className="text-blue-500" justify={"end"} gap={"1"} mb={"2"}>
        <Lightbulb size={24} />
        <Text>ملاحظة</Text>
      </Flex>
      <Box dir="auto">{children}</Box>
    </Box>
  );
}
