import type { Lesson } from "@app/types";

export const canGuestAccessLesson = (lesson: Pick<Lesson, "isFree">) =>
  lesson.isFree;
