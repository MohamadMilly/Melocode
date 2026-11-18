import {
  processProgressAchievement,
  processSubmissionAchievement,
} from "../achievement.service.js";

type AchievementEventPayload = {
  userId: number;
};

export const handleSubmissionAchievement = ({
  userId,
}: AchievementEventPayload) => processSubmissionAchievement(userId);

export const handleProgressAchievement = ({
  userId,
}: AchievementEventPayload) => processProgressAchievement(userId);
