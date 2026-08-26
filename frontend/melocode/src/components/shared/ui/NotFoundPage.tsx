import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { FileQuestion, Home } from "lucide-react";
import {  Link } from "react-router";

export function ErrorPage() {
  
  return (
    <main
      dir="rtl"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_left,var(--gray-3)_1px,transparent_1px),linear-gradient(to_bottom,var(--gray-3)_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-30" />

      <Flex
        direction="column"
        align="center"
        gap="4"
        className="relative z-10 max-w-md text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--accent-a3) text-(--accent-11)">
          <FileQuestion size={40} strokeWidth={1.75} />
        </div>
        <Text size="8" weight="bold" className="text-(--accent-11)">
          404
        </Text>
        <Heading size="6">الصفحة غير موجودة</Heading>
        <Text as="p" size="3" color="gray">
          يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </Text>
        <Button asChild size="3">
          <Link to="/">
            <Home size={18} />
            العودة إلى الرئيسية
          </Link>
        </Button>
      </Flex>
    </main>
  );
}
