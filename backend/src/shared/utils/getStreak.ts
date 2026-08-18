import { UserLessonProgress } from "../../generated/prisma/client.js";

export function getStreak(lessonProgresses: UserLessonProgress[]) {
  if (lessonProgresses.length === 0) {
    return 0;
  }

  let streak = 1;
  
  for (let i = 0; i < lessonProgresses.length; i++) {
    let l1 = lessonProgresses[i];
    let l2 = lessonProgresses[i + 1];

    if (!l1 || !l2) break;

    const d1 = new Date(l1.completedAt);
    d1.setHours(0, 0, 0, 0);

    const d2 = new Date(l2.completedAt);
    d2.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) continue;

    if (diffDays === 1) {
      streak++;
    } else {
      streak = 1;
    }
  }

  const lastLessonDate = new Date(
    lessonProgresses[lessonProgresses.length - 1].completedAt,
  );
  lastLessonDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const finalDiffTime = Math.abs(today.getTime() - lastLessonDate.getTime());
  const finalDiffDays = Math.ceil(finalDiffTime / (1000 * 60 * 60 * 24));

  if (finalDiffDays > 1) {
    streak = 0;
  }

  return streak;
}
