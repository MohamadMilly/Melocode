import { Lesson, LessonStatus, UserLessonProgress } from "@app/types";

export const deriveLessonsStatuses = <
  T extends Lesson & { lessonProgresses: UserLessonProgress[] },
>(
  lessons: T[],
): (T & { status: LessonStatus })[] => {
  const lessonsWithStatus = [];

  for (let i = 0; i < lessons.length; i++) {
    const currentLesson = lessons[i];
    const previousLesson = lessons[i - 1];
    let status: LessonStatus;

    if (
      currentLesson.lessonProgresses &&
      currentLesson.lessonProgresses.length === 1
    ) {
      status = "completed";
    } else if (
      !previousLesson ||
      (previousLesson.lessonProgresses &&
        previousLesson.lessonProgresses.length === 1)
    ) {
      status = "current";
    } else {
      status = "locked";
    }

    lessonsWithStatus.push({
      ...currentLesson,
      status: status,
    });
  }

  return lessonsWithStatus;
};
