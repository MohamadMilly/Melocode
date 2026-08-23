export type UserLessonProgress = {
  id: number;
  lessonId: number;
  userId: number;
  completedAt: Date;
  [key: string]: any;
};

export type LessonProgressResponse = {
  hasCompletedAllQuizzes: boolean;
  progress: UserLessonProgress | null;
};

export type Profile = {
  id: number;
  avtarUrl?: string;
  userId: number;
};

export type User = {
  id: number;
  fullname: string;
  username: string;
  createdAt: Date;
  lessonProgresses?: UserLessonProgress[];
  profile?: Profile;
  [key: string]: any;
};

export type Lesson = {
  id: number;
  title: string;
  slug: string;
  createdAt: Date;
  lessonProgresses?: UserLessonProgress[];
};

export type UserJwtPayload = {
  id: number;
  fullname: string;
  username: string;
  createdAt: Date;
};

export type RegisterRequestBody = {
  password: string;
  fullname: string;
  username: string;
  confirmPassword: string;
};

export type LoginRequestBody = {
  username: string;
  password: string;
};

export type RegisterResponseBody = {
  user: UserJwtPayload;
  accessToken: string;
  refreshToken: string;
};

export type LoginResponseBody = {
  user: UserJwtPayload;
  accessToken: string;
  refreshToken: string;
};

export type GetLessonsResponse = {
  lessons: ExtendedLesson[];
};

export type ExtendedUser = {
  streak: number;
} & User;

export type LessonStatus = "completed" | "locked" | "current";

export type ExtendedLesson = {
  status: LessonStatus;
} & Lesson;

export type UserQuizOutput = {
  testCaseId: number;
  output: string;
};

export type ResponseError = {
  message: string;
};

export type serverFormError = {
  field: string;
  message: string;
};

export type QuizAnswerItem = {
  id: number;
  type: "TEXT" | "NOTE" | "CODE";
  content: string;
  language?: string;
};

export type QuizAnswer = {
  id: number;
  lessonId: number;
  items: QuizAnswerItem;
};

export type QuizSubmission = {
  id: number;
  content: string;
  language: string | null;
  userId: number;
  isCorrect: boolean;
  quizAnswerId: number;
  submittedAt: Date;
  user?: User;
  quizAnswer?: QuizAnswer;
};

export type CreateSubmissionRequestBody = Pick<
  QuizSubmission,
  "content" | "language"
> & {
  userOutputs: UserQuizOutput[];
};

export type CreateQuizSubmissionResponse = {
  submission: QuizSubmission;
};

export type QuizTestCase = {
  id: number;
  input: string;
  output: string;
  quizAnswerId?: number;
};

export type GetLessonQuizzesSubmissionsResponse = {
  submissionsData: {
    id: number;
    submissions: QuizSubmission[];
  }[];
};

export type QuizGiveUp = {
  id: number;
  userId: number;
  givenUpAt: Date;
  quizAnswerId: number;
};

export type GetLessonQuizzesGiveUpsResponse = {
  giveUpsData: {
    id: number;
    giveUps: QuizGiveUp[];
  }[];
};

export type GetUserProgressResponse = {
  progresses: UserLessonProgress[];
  progressFraction: number;
};
