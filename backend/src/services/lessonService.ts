import { HttpError } from "../shared/errors/HttpError.js";
import { eventEmitter } from "../lib/eventEmitter.js";
import { hasCompletedAllQuizzes } from "../domains/quiz.domain.js";
import { UserLessonProgress } from "@app/types";
import {
  giveGuestLesson,
  giveLessonWithStatus,
} from "../domains/lesson.domain.js";
import { quizRepository } from "../repositories/quiz.repository.js";
import { lessonProgressRepository } from "../repositories/lessonProgress.repository.js";
import { lessonRepository } from "../repositories/lesson.repository.js";

export const completeLesson = async ({
  userId,
  slug,
}: {
  userId: number;
  slug: string;
}): Promise<UserLessonProgress> => {
  const quizAnswers = await quizRepository.findQuizAnswersWithUserCompletion(
    userId,
    slug,
  );
  const result = hasCompletedAllQuizzes(quizAnswers);
  if (!result) {
    throw new HttpError(
      400,
      "You haven't finished all quizzes yet. Complete them or Give up and try again.",
    );
  }
  const existingProgress = await lessonProgressRepository.findProgress(
    userId,
    slug,
  );

  if (existingProgress) {
    throw new HttpError(400, "This lesson has already been completed.");
  }
  const progress = await lessonProgressRepository.createProgress(userId, slug);

  eventEmitter.emit("lesson-completed", { userId: userId });
  return progress;
};

export const getUserLesson = async (userId: number, slug: string) => {
  const lesson = await lessonRepository.findLessonWithModule(slug);

  if (!lesson) {
    throw new HttpError(404, `Lesson path not found for slug: ${slug}`);
  }

  const pathId = lesson.module.pathId;
  // 5 db calls , it is acceptable up to now
  const [activeOrder, previousLesson, nextLesson, quizAnswers, progress] =
    await Promise.all([
      lessonRepository.findActiveOrder(userId, { pathId }),
      lessonRepository.findPreviousLesson(pathId, lesson.order),
      lessonRepository.findNextLesson(pathId, lesson.order),
      quizRepository.findQuizAnswersWithUserCompletion(userId, slug),
      lessonProgressRepository.findProgress(userId, slug),
    ]);

  const extendedLesson = giveLessonWithStatus(lesson, activeOrder);
  const hasAllQuizzesCompleted = hasCompletedAllQuizzes(quizAnswers);

  const previousLessonWithStatus = previousLesson
    ? giveLessonWithStatus(previousLesson, activeOrder)
    : null;
  console.log("Active Order:", activeOrder);
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

/* PUT isFree flag on lessons to make them free to access by the user !
This is gonna be aswesome ! ,
the conclusion :
putting the flag on the lesson is much flexible and easier for the code and for the future edits (we can make the tenth lesson free without making the previous free too)
so we let the lesson itself tell us what it is 
*/

export const getGuestLesson = async (slug: string) => {
  const lesson = await lessonRepository.findLessonWithModuleAndPath(slug);

  if (!lesson) {
    throw new HttpError(404, "Lesson is not found.");
  }

  const guestLesson = giveGuestLesson(lesson);
  if (guestLesson.status === "preview") {
    return { ...guestLesson, hasCompletedAllQuizzes: false, status: "preview" };
  } else {
    throw new HttpError(
      403,
      "It is not alloweed to access this lesson. Please sign up or log in to access this lesson.",
    );
  }
};
