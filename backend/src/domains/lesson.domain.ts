import { Lesson, LessonStatus, Module } from "@app/types";
import { LESSONS_GUEST_LIMIT } from "../shared/constants/guestPlanConstants.js";

export const deriveUserLessonsStatuses = <T extends Lesson>(
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

export const deriveGuestLessonsStatuses = <T extends Lesson>(
  lessons: T[],
): (T & { status: LessonStatus })[] =>
  lessons.map((lesson, index) => ({
    ...lesson,
    status: index < LESSONS_GUEST_LIMIT ? "current" : "locked",
  }));

function attachLessonStatuses<T extends Module>(
  modules: T[],
  lessonsWithStatuses: (Lesson & { status: LessonStatus })[],
) {
  const statusesByLessonId = new Map(
    lessonsWithStatuses.map(({ id, status }) => [id, status]),
  );

  return modules.map((module) => ({
    ...module,
    lessons: (module.lessons ?? []).map((lesson) => ({
      ...lesson,
      status: statusesByLessonId.get(lesson.id)!,
    })),
  }));
}

export function giveUserModulesWithStatuses<T extends Module>(modules: T[]) {
  const lessonsWithStatuses = deriveUserLessonsStatuses(
    modules.flatMap((module) => module.lessons ?? []),
  );
  return attachLessonStatuses(modules, lessonsWithStatuses);
}

export function giveGuestModulesWithStatuses<T extends Module>(modules: T[]) {
  const lessonsWithStatuses = deriveGuestLessonsStatuses(
    modules.flatMap((module) => module.lessons ?? []),
  );
  return attachLessonStatuses(modules, lessonsWithStatuses);
}
