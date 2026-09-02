import { prisma } from "../lib/prisma.js";
import { HttpError } from "../shared/errors/HttpError.js";

export const giveUpToQuiz = async (quizAnswerId: number, userId: number) => {
  try {
    const existingSorrectSubmission = await prisma.quizSubmission.findUnique({
      where: {
        userId_quizAnswerId_isCorrect: {
          userId,
          quizAnswerId,
          isCorrect: true,
        },
      },
    });
    if (existingSorrectSubmission) {
      throw new HttpError(400, "لا يمكن الاستسلام عن تمرين محلول مسبقا");
    }
    const giveUpRecord = await prisma.quizGiveUp.create({
      data: {
        userId: userId,
        quizAnswerId: quizAnswerId,
      },
    });
    return giveUpRecord;
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new HttpError(400, "You have already given up to this lesson");
    }
    if (err.code === "P2003") {
      throw new HttpError(
        500,
        `Foreign key constraint error: ${err.meta?.field_name ?? "Unknown"} does not exist`,
      );
    } else {
      throw err;
    }
  }
};

export const getUserQuizGiveUp = async (
  userId: number,
  quizAnswerId: number,
) => {
  const giveUp = await prisma.quizGiveUp.findUnique({
    where: {
      userId_quizAnswerId: {
        userId,
        quizAnswerId,
      },
    },
  });

  return giveUp;
};

export const getUserQuizzesGiveUpsForLesson = async (
  userId: number,
  lessonId: number,
) => {
  const giveUpsData = await prisma.quizAnswer.findMany({
    where: {
      lessonId,
    },
    select: {
      id: true,
      giveUps: {
        where: {
          userId: userId,
        },
      },
    },
  });
  return giveUpsData;
};
