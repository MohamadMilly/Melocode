import type { AchievementFrequency, AchievementScope } from "@app/types";

import SubmissionOneImage from "../../assests/images/achievements/submission/submission_1_achievement.png";
import SubmissionTenImage from "../../assests/images/achievements/submission/submission_10_achievement.png";
import SubmissionHundredImage from "../../assests/images/achievements/submission/submission_100_achievement.png";
import SubmissionThousandImage from "../../assests/images/achievements/submission/submission_1000_achievement.png";

import ProgressOneImage from "../../assests/images/achievements/progress/progress_1_achievement.png";
import ProgressTenImage from "../../assests/images/achievements/progress/progress_10_achievement.png";
import ProgressHundredImage from "../../assests/images/achievements/progress/progress_100_achievement.png";
import ProgressThousandImage from "../../assests/images/achievements/progress/progress_1000_achievement.png";

import StreakOneImage from "../../assests/images/achievements/streak/streak_1_achievement.png";
import StreakTenImage from "../../assests/images/achievements/streak/streak_10_achievement.png";
import StreakHundredImage from "../../assests/images/achievements/streak/streak_100_achievement.png";
import StreakThousandImage from "../../assests/images/achievements/streak/streak_1000_achievement.png";

export const achievementImages = {
  SUBMISSION: {
    ONE: SubmissionOneImage,
    TEN: SubmissionTenImage,
    HUNDRED: SubmissionHundredImage,
    THOUSAND: SubmissionThousandImage,
  },
  PROGRESS: {
    ONE: ProgressOneImage,
    TEN: ProgressTenImage,
    HUNDRED: ProgressHundredImage,
    THOUSAND: ProgressThousandImage,
  },
  STREAK: {
    ONE: StreakOneImage,
    TEN: StreakTenImage,
    HUNDRED: StreakHundredImage,
    THOUSAND: StreakThousandImage,
  },
} as const;

export const frequencyLabels: Record<
  AchievementScope,
  Record<AchievementFrequency, string>
> = {
  SUBMISSION: {
    ONE: "الاجابة الصحيحة الأولى",
    TEN: "الاجابة الصحيحة العاشرة",
    HUNDRED: "الاجابة الصحيحة المئة",
    THOUSAND: "الاجابة الصحيحة الألف",
  },
  PROGRESS: {
    ONE: "الدرس المكتمل الأول",
    TEN: "الدرس المكتمل العاشر",
    HUNDRED: "الدرس المكتمل المئة",
    THOUSAND: "الدرس المكتمل الألف",
  },
  STREAK: {
    ONE: "اليوم المتتالي الأول",
    TEN: "اليوم المتتالي العاشر",
    HUNDRED: "اليوم المتتالي المئة",
    THOUSAND: "اليوم المتتالي الألف",
  },
};
