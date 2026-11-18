import { HttpError } from "../../shared/errors/HttpError.js";
import { hasCompletedAllQuizzes } from "../../shared/domains/quizCompletion.domain.js";
import {
  giveGuestLesson,
  giveLessonWithStatus,
} from "../../shared/domains/lessonStatus.domain.js";
import { activeOrderRepository } from "../../shared/persistence/activeOrder.repository.js";
import { lessonRepository } from "./lesson.repository.js";
import { canGuestAccessLesson } from "./lesson.domain.js";

export const getUserLesson = async (userId: number, slug: string) => {
  const lesson = await lessonRepository.findLessonWithModule(slug);

  if (!lesson) {
    throw new HttpError(404, `Lesson path not found for slug: ${slug}`);
  }

  const pathId = lesson.module.pathId;
  const [activeOrder, previousLesson, nextLesson, quizAnswers, progress] =
    await Promise.all([
      activeOrderRepository.findActiveOrder(userId, { pathId }),
      lessonRepository.findPreviousLesson(pathId, lesson.order),
      lessonRepository.findNextLesson(pathId, lesson.order),
      lessonRepository.findQuizAnswersWithUserCompletion(userId, slug),
      lessonRepository.findProgress(userId, slug),
    ]);

  const extendedLesson = giveLessonWithStatus(lesson, activeOrder);
  const hasAllQuizzesCompleted = hasCompletedAllQuizzes(quizAnswers);
  const previousLessonWithStatus = previousLesson
    ? giveLessonWithStatus(previousLesson, activeOrder)
    : null;
  const nextLessonWithStatus = nextLesson
    ? giveLessonWithStatus(nextLesson, activeOrder)
    : null;

  return {
    hasCompletedAllQuizzes: hasAllQuizzesCompleted,
    progress,
    previousLesson: previousLessonWithStatus,
    nextLesson: nextLessonWithStatus,
    lesson: extendedLesson,
  };
};

export const getGuestLesson = async (slug: string) => {
  const lesson = await lessonRepository.findLessonWithModuleAndPath(slug);

  if (!lesson) {
    throw new HttpError(404, "Lesson is not found.");
  }

  if (!canGuestAccessLesson(lesson)) {
    throw new HttpError(
      403,
      "It is not alloweed to access this lesson. Please sign up or log in to access this lesson.",
    );
  }

  const guestLesson = giveGuestLesson(lesson);
  return {
    lesson: guestLesson,
    progress: null,
    nextLesson: null,
    previousLesson: null,
    hasCompletedAllQuizzes: false,
  };
};
