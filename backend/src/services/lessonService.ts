import { prisma } from "../lib/prisma.js";
import { HttpError } from "../shared/errors/HttpError.js";
import { eventEmitter } from "../lib/eventEmitter.js";
import { hasCompletedAllQuizzes } from "../shared/utils/hasCompletedAllQuizzes.js";
import { deriveLessonsStatuses } from "../shared/utils/deriveLessonsStatuses.js";
import { extractLessonWithNeighbors } from "../shared/utils/extractLessonWithNeighbors.js";
import { ExtendedLesson, UserLessonProgress } from "@app/types";

export const completeLesson = async ({
  userId,
  lessonId,
}: {
  userId: number;
  lessonId: number;
}): Promise<UserLessonProgress> => {
  try {
    const quizzesAnswersWithSubmissionsAndGiveUps =
      await prisma.quizAnswer.findMany({
        where: {
          lessonId: lessonId,
        },
        select: {
          id: true,
          lessonId: true,
          submissions: {
            where: {
              userId: userId,
              isCorrect: true,
            },
          },
          giveUps: {
            where: {
              userId: userId,
            },
          },
        },
      });
    const result = hasCompletedAllQuizzes(
      quizzesAnswersWithSubmissionsAndGiveUps,
    );

    if (!result) {
      throw new HttpError(
        400,
        "You haven't finished all quizzes yet. Complete them or Give up and try again.",
      );
    }

    const progress = await prisma.userLessonProgress.create({
      data: { userId, lessonId },
    });
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
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    include: {
      module: true,
    },
  });
  if (!lesson) {
    throw new HttpError(404, "Lesson is not found.");
  }
  const allLessons = await prisma.lesson.findMany({
    where: {
      module: {
        pathId: lesson.module.pathId,
      },
    },
    include: {
      lessonProgresses: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const allLessonsWithStatuses = deriveLessonsStatuses(allLessons);
  const lessonWithNeighbors = extractLessonWithNeighbors(
    allLessonsWithStatuses,
    lessonId,
  );

  const quizzesWithUserSubmissions = await prisma.quizAnswer.findMany({
    where: { lessonId: lessonId },
    include: {
      submissions: { where: { userId: userId, isCorrect: true } },
      giveUps: { where: { userId: userId } },
    },
  });

  const result = hasCompletedAllQuizzes(quizzesWithUserSubmissions);

  return {
    hasCompletedAllQuizzes: result,
    ...lessonWithNeighbors,
  };
};

export const getGuestLessons = async (): Promise<ExtendedLesson[]> => {
  return (
    await prisma.lesson.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })
  ).map((lesson, index) =>
    index <= 10
      ? { ...lesson, status: "current" }
      : { ...lesson, status: "locked" },
  );
};

export const getGuestLesson = async (lessonId: number) => {
  const lessons = await getGuestLessons();
  const lessonWithNeighbors = extractLessonWithNeighbors(lessons, lessonId);

  return { ...lessonWithNeighbors, hasCompletedAllQuizzes: false };
};
