import {
  ExtendedLesson,
  Lesson,
  LessonStatus,
  Module,
  UserType,
} from "@app/types";

export function determineStatus(
  order: number,
  activeOrder: number,
): LessonStatus {
  if (order < activeOrder) {
    return "completed";
  }
  if (order === activeOrder) {
    return "current";
  }
  return "locked";
}

export function giveGuestLesson<T extends Lesson>(lesson: T): ExtendedLesson {
  return {
    ...lesson,
    status: lesson.isFree ? "preview" : "locked",
  };
}

export const deriveUserLessonsStatuses = <T extends Lesson>(
  lessons: T[],
  activeOrder: number,
): (T & { status: LessonStatus })[] =>
  lessons.map((lesson) => ({
    ...lesson,
    status: determineStatus(lesson.order, activeOrder),
  }));

export function giveLessonWithStatus<T extends Lesson>(
  lesson: T,
  activeOrder: number,
) {
  return { ...lesson, status: determineStatus(lesson.order, activeOrder) };
}

export function giveModulesWithStatuses<T extends Module>(
  modules: T[],
  userType: UserType,
  activeOrder?: number,
) {
  return modules.map((module) => ({
    ...module,
    lessons: module.lessons.map((lesson) =>
      userType === "MEMBER"
        ? giveLessonWithStatus(lesson, activeOrder!)
        : giveGuestLesson(lesson),
    ),
  }));
}
