import { ExtendedLesson } from "@app/types";
import { HttpError } from "../errors/HttpError.js";

export const extractLessonWithNeighbors = (
  allLessonsWithStatuses: ExtendedLesson[],
  lessonId: number,
) => {
  const currentLessonIndex = allLessonsWithStatuses.findIndex(
    (l) => l.id === lessonId,
  );

  if (currentLessonIndex === -1) {
    throw new HttpError(404, "Lesson is not found.");
  }

  const currentLessonWithStatus = allLessonsWithStatuses[currentLessonIndex];
  const { lessonProgresses, status, ...lesson } = currentLessonWithStatus;

  const previousLesson = allLessonsWithStatuses[currentLessonIndex - 1] ?? null;
  const nextLesson = allLessonsWithStatuses[currentLessonIndex + 1] ?? null;

  return {
    lesson: {
      ...lesson,
      status: status,
    },
    previousLesson: previousLesson
      ? {
          slug: previousLesson.slug,
          title: previousLesson.title,
          status: previousLesson.status,
        }
      : null,
    nextLesson: nextLesson
      ? {
          slug: nextLesson.slug,
          title: nextLesson.title,
          status: nextLesson.status,
        }
      : null,
    progress: lessonProgresses?.[0] ?? null,
  };
};
