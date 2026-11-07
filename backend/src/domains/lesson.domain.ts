import { Lesson, LessonStatus, Module, UserType } from "@app/types";

/*
we need two functions literally, determineStatus to help us determine the status of a lesson by getting its order and the active order , 
notice here we care about logic rules of the app , so we need to keep all functions pure
*/

// simple , pure , awesome!
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
  if (order > activeOrder) {
    return "locked";
  }
}

export function giveGuestLesson(lesson: Lesson) {
  return {
    ...lesson,
    status: lesson.isFree ? "preview" : "locked",
  };
}

// short , pure , simple , awesome !
export const deriveUserLessonsStatuses = <T extends Lesson>(
  lessons: T[],
  activeOrder: number,
): (T & { status: LessonStatus })[] => {
  return lessons.map((lesson) => {
    const status = determineStatus(lesson.order, activeOrder);
    return { ...lesson, status };
  });
};

export function giveLessonWithStatus<T extends Lesson>(
  lesson: T,
  activeOrder: number,
) {
  const status = determineStatus(lesson.order, activeOrder);
  return { ...lesson, status };
}

export function giveModulesWithStatuses<T extends Module>(
  modules: T[],
  userType: UserType,
  activeOrder?: number,
) {
  return modules.map((module) => {
    return {
      ...module,
      lessons: module.lessons.map((lesson) => {
        if (userType === "MEMBER") {
          const lessonWithStatus = giveLessonWithStatus(lesson, activeOrder!);
          return lessonWithStatus;
        } else if (userType === "GUEST") {
          return giveGuestLesson(lesson);
        }
      }),
    };
  });
}
