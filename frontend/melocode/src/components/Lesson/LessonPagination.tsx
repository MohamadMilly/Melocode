import { Button, Flex } from "@radix-ui/themes";
import { ArrowLeft, ArrowRight } from "lucide-react";

type LessonPaginationProps = {
  canNavigateToNextLesson: boolean;
  canNavigateToPreviousLesson: boolean;
  handleNextLesson: () => void;
  handlePreviousLesson: () => void;
};

export function LessonPagination({
  canNavigateToNextLesson,
  canNavigateToPreviousLesson,
  handleNextLesson,
  handlePreviousLesson,
}: LessonPaginationProps) {
  return (
    <Flex justify="between" align="center" mt="6" gap="3">
      {canNavigateToNextLesson && (
        <Button
          variant="soft"
          size="3"
          onClick={handleNextLesson}
          aria-label="الدرس التالي"
        >
          <ArrowRight size={18} />
          التالي
        </Button>
      )}

      {canNavigateToPreviousLesson && (
        <Button
          variant="soft"
          size="3"
          onClick={handlePreviousLesson}
          aria-label="الدرس السابق"
        >
          السابق
          <ArrowLeft size={18} />
        </Button>
      )}
    </Flex>
  );
}
