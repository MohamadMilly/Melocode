import { HttpError } from "../../shared/errors/HttpError.js";
import { quizRepository } from "../../shared/persistence/quiz.repository.js";
import { meRepository } from "./me.repository.js";

export const getCurrentUser = (userId: number) =>
  meRepository.findCurrentUser(userId);

export const getLessonSubmissions = async (
  userId: number,
  slug: string,
  isCorrect?: boolean,
) => {
  if (!userId || !slug) {
    throw new HttpError(400, "معلومات مطلوبة مفقودة (slug و userId)");
  }

  return quizRepository.findLessonSubmissions(userId, slug, isCorrect);
};

export const getQuizSubmissions = async (
  userId: number,
  externalQuizId: string,
) => {
  const quiz =
    await quizRepository.findQuizAnswerByExternalId(externalQuizId);
  if (!quiz) {
    throw new HttpError(404, "لم يتم العثور على إجابة هذا الاختبار.");
  }
  return quizRepository.findQuizSubmissions(userId, quiz.id);
};

export const getQuizGiveUp = async (
  userId: number,
  externalQuizId: string,
) => {
  const quiz =
    await quizRepository.findQuizAnswerByExternalId(externalQuizId);
  if (!quiz) {
    throw new HttpError(404, "لم يتم العثور على هذا الاختبار");
  }
  return quizRepository.findQuizGiveUp(userId, quiz.id);
};

export const getLessonGiveUps = (userId: number, slug: string) =>
  quizRepository.findLessonGiveUps(userId, slug);

export const getUserAchievements = (userId: number) =>
  meRepository.findAchievements(userId);
