import { Box, Flex, Text } from "@radix-ui/themes";
import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

export function QuizHint({ children }: { children: ReactNode }) {
  return (
    <Box
      my={"4"}
      p={"3"}
      className="bg-yellow-500/10 border-r-4 border-yellow-500 w-full"
    >
      <Flex dir="rtl" className="text-yellow-500" justify={"start"} gap={"1"}>
        <Lightbulb size={24} />
        <Text>تلميح</Text>
      </Flex>
      <Box dir="rtl" className="text-balance">
        {children}
      </Box>
    </Box>
  );
}
