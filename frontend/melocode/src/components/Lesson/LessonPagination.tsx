import { Flex } from "@radix-ui/themes";
import type { GetLessonResponse } from "@app/types";
import { NavigationCard } from "./NavigationCard";

type NavigationLesson = NonNullable<GetLessonResponse["nextLesson"]>;

type LessonPaginationProps = {
  nextLesson: NavigationLesson | null;
  previousLesson: NavigationLesson | null;
  canNavigateToNextLesson: boolean;
  canNavigateToPreviousLesson: boolean;
  handleNextLesson: () => void;
  handlePreviousLesson: () => void;
};

export function LessonPagination({
  nextLesson,
  previousLesson,
  canNavigateToNextLesson,
  canNavigateToPreviousLesson,
  handleNextLesson,
  handlePreviousLesson,
}: LessonPaginationProps) {
  return (
    <Flex justify="between" mt="6" gap="3" className="flex-col sm:flex-row">
      {nextLesson && (
        <NavigationCard
          lesson={nextLesson}
          direction="next"
          disabled={!canNavigateToNextLesson}
          onClick={handleNextLesson}
        />
      )}

      {previousLesson && (
        <NavigationCard
          lesson={previousLesson}
          direction="previous"
          disabled={!canNavigateToPreviousLesson}
          onClick={handlePreviousLesson}
        />
      )}
    </Flex>
  );
}
