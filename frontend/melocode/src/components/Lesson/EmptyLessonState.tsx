import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { BookOpenText, Home } from "lucide-react";
import { Link } from "react-router";

export function EmptyLessonState() {
  return (
    <main
      dir="rtl"
      className="flex min-h-[60vh] items-center justify-center px-4 py-10"
    >
      <Flex
        direction="column"
        align="center"
        gap="4"
        className="w-full max-w-md rounded-[var(--radius-5)] border border-[var(--gray-5)] bg-[var(--gray-1)] p-8 text-center shadow-sm"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent-a3)] text-[var(--accent-11)]">
          <BookOpenText size={36} strokeWidth={1.7} />
        </div>

        <Heading size="6" className="text-[var(--accent-11)]">
          الدرس غير موجود
        </Heading>

        <Text as="p" size="3" color="gray">
          هذا الرابط لا يشير إلى درس صالح في المسار الحالي، أو ربما تم حذف
          المحتوى.
        </Text>

        <Button asChild size="3" variant="soft">
          <Link to="/">
            <Home size={16} />
            العودة إلى الصفحة الرئيسية
          </Link>
        </Button>
      </Flex>
    </main>
  );
}
