import { HttpError } from "../shared/errors/HttpError.js";
import { eventEmitter } from "../lib/eventEmitter.js";
import { hasCompletedAllQuizzes } from "../domains/quiz.domain.js";
import { extractLessonWithNeighbors } from "../shared/utils/extractLessonWithNeighbors.js";
import { UserLessonProgress } from "@app/types";
import {
  deriveGuestLessonsStatuses,
  deriveUserLessonsStatuses,
} from "../domains/lesson.domain.js";
import { quizRepository } from "../repositories/quiz.repository.js";
import { lessonProgressRepository } from "../repositories/lessonProgress.repository.js";
import { lessonRepository } from "../repositories/lesson.repository.js";

export const completeLesson = async ({
  userId,
  lessonId,
}: {
  userId: number;
  lessonId: number;
}): Promise<UserLessonProgress> => {
  try {
    const quizAnswers = await quizRepository.findQuizAnswersWithUserCompletion(
      userId,
      lessonId,
    );
    const result = hasCompletedAllQuizzes(quizAnswers);

    if (!result) {
      throw new HttpError(
        400,
        "You haven't finished all quizzes yet. Complete them or Give up and try again.",
      );
    }

    const progress = await lessonProgressRepository.createProgress(
      userId,
      lessonId,
    );
    eventEmitter.emit("lesson-completed", { userId: userId });
    return progress;
  } catch (err: any) {
    if (err?.code === "P2002") {
      throw new HttpError(400, "This lesson has already been completed.");
    } else {
      throw err;
    }
  }
};

export const getUserLesson = async (userId: number, lessonId: number) => {
  const lesson = await lessonRepository.findLessonPath(lessonId);
  if (!lesson?.module) {
    throw new HttpError(404, "Lesson is not found.");
  }
  const allLessons = await lessonRepository.findLessonsForPath(
    lesson.module.pathId,
    userId,
  );

  const allLessonsWithStatuses = deriveUserLessonsStatuses(allLessons);
  const lessonWithNeighbors = extractLessonWithNeighbors(
    allLessonsWithStatuses,
    lessonId,
  );

  const quizzesWithUserSubmissions =
    await quizRepository.findQuizAnswersWithUserCompletion(userId, lessonId);

  const result = hasCompletedAllQuizzes(quizzesWithUserSubmissions);

  return {
    hasCompletedAllQuizzes: result,
    ...lessonWithNeighbors,
  };
};

export const getGuestLesson = async (lessonId: number) => {
  const lesson = await lessonRepository.findLessonPath(lessonId);
  if (!lesson?.module) {
    throw new HttpError(404, "Lesson is not found.");
  }

  const allLessons = await lessonRepository.findLessonsForPath(
    lesson.module.pathId,
  );
  const allLessonsWithStatuses = deriveGuestLessonsStatuses(allLessons);
  const lessonWithNeighbors = extractLessonWithNeighbors(
    allLessonsWithStatuses,
    lessonId,
  );
  
  return { ...lessonWithNeighbors, hasCompletedAllQuizzes: false };
};
