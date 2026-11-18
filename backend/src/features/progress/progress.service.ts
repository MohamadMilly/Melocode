import { UserLessonProgress } from "@app/types";
import { eventEmitter } from "../../infrastructure/lib/eventEmitter.js";
import { HttpError } from "../../shared/errors/HttpError.js";
import { hasCompletedAllQuizzes } from "../../shared/domains/quizCompletion.domain.js";
import { progressRepository } from "./progress.repository.js";

export const completeLesson = async ({
  userId,
  slug,
}: {
  userId: number;
  slug: string;
}): Promise<UserLessonProgress> => {
  const quizAnswers =
    await progressRepository.findQuizAnswersWithUserCompletion(userId, slug);

  if (!hasCompletedAllQuizzes(quizAnswers)) {
    throw new HttpError(
      400,
      "You haven't finished all quizzes yet. Complete them or Give up and try again.",
    );
  }

  const existingProgress = await progressRepository.findProgress(userId, slug);
  if (existingProgress) {
    throw new HttpError(400, "This lesson has already been completed.");
  }

  const progress = await progressRepository.createProgress(userId, slug);
  eventEmitter.emit("lesson-completed", { userId });
  return progress;
};
