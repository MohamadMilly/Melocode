export type UserLessonProgress = {
  id: number;
  lessonId: number;
  userId: number;
  completedAt: Date;
  [key: string]: any;
};

export type GetLessonResponse = {
  hasCompletedAllQuizzes: boolean;
  progress: UserLessonProgress | null;
  previousLesson: ExtendedLesson | Lesson | null;
  nextLesson: ExtendedLesson | Lesson | null;
  lesson: ExtendedLesson;
};

export type LessonResponseDto = GetLessonResponse & {
  authStatus: AuthStatus;
};

export type CreateProgressResponseDto = {
  progress: UserLessonProgress;
};

export type GetPathsResponseDto = {
  paths: Path[];
};

export type GetPathModulesResponseDto = {
  modules: Module[];
  authStatus: AuthStatus;
};

export type TestCase = {
  id: number;
  quizAnswerId: number;
  input: string;
  output: string;
};

export type Profile = {
  id: number;
  avtarUrl?: string;
  userId: number;
};

export type UserType = "GUEST" | "MEMBER";

export type User = {
  id: number;
  fullname: string;
  username: string;
  createdAt: Date;
  lessonProgresses?: UserLessonProgress[];
  profile?: Profile;
  [key: string]: any;
};

export type Path = {
  id: number;
  createdAt: Date;
  title: string;
  slug: string;
  description?: string;
};

export type Module = {
  id: number;
  title: string;
  slug: string;
  pathId: number;
  createdAt: Date;
  lessons?: ExtendedLesson[];
};

export type ModuleWithLessonsStatuses = Omit<Module, "lessons"> & {
  lessons: ExtendedLesson[];
};

export type Lesson = {
  id: number;
  title: string;
  slug: string;
  createdAt: Date;
  lessonProgresses?: UserLessonProgress[];
  moduleId?: number;
  order: number;
  isFree: boolean;
};

export interface UserJwtPayload {
  id: number;
  fullname: string;
  username: string;
  createdAt: Date;
}

export interface RegisterRequestBody {
  password: string;
  fullname: string;
  username: string;
  confirmPassword: string;
}

export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface RegisterResponseBody {
  user: UserJwtPayload;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseBody {
  user: UserJwtPayload;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequestBody {
  refreshToken: string;
}

export interface RefreshTokenResponseBody {
  accessToken: string;
}

export type GetLessonsResponse = {
  lessons: ExtendedLesson[];
};

export type ExtendedUser = {
  streak: number;
} & User;

export type LessonStatus = "completed" | "locked" | "current" | "preview";

export type ExtendedLesson = {
  status: LessonStatus;
} & Lesson;

export type UserQuizOutput = {
  testCaseId: number;
  output: string;
};

export interface ResponseError {
  message: string;
}

export type serverFormError = {
  field: string;
  message: string;
};

export type QuizAnswerItem = {
  id: number;
  type: "TEXT" | "NOTE" | "CODE";
  content: string;
  language: string | undefined;
};

export type QuizAnswer = {
  id: number;
  external_quizId: string | null;
  lessonId: number;
  items: QuizAnswerItem[];
  giveUps: QuizGiveUp[];
  submissions: QuizSubmission[];
};

export type GetQuizAnswerResponseDto = {
  quizAnswer: QuizAnswer;
};

export type QuizSubmission = {
  id: number;
  content: string;
  language?: string | null;
  userId: number;
  isCorrect: boolean;
  quizAnswerId: number;

  submittedAt: Date;
  user?: User;
};

export type QuizGiveUp = {
  id: number;
  userId: number;
  givenUpAt: Date;

  quizAnswerId: number;
};

export type GetLessonQuizzesSubmissionsResponse = {
  submissionsData: {
    external_quizId: string | null;
    submissions: QuizSubmission[];
  }[];
};

export type GetLessonQuizzesGiveUpsResponse = {
  giveUpsData: {
    external_quizId: string | null;
    giveUps: QuizGiveUp[];
  }[];
};

export type CreateSubmissionRequestBody = Pick<
  QuizSubmission,
  "content" | "language"
> & {
  userOutputs: UserQuizOutput[];
  type?: QuizSubmissionType;
};

export type QuizSubmissionType = "MULTIPLE_CHOICE" | "CODING";

export type CreateQuizSubmissionResponse = {
  submission: QuizSubmission;
};

export type QuizTestCase = {
  id: number;
  input: string;
  output: string;
  quizAnswerId: number;
};

export type QuizTestCaseInput = Pick<QuizTestCase, "id" | "input">;

export type GetQuizTestCasesResponseDto = {
  testCases: QuizTestCaseInput[];
};

export type GetQuizSubmissionsResponseDto = {
  submissions: QuizSubmission[];
};

export type GetQuizGiveUpResponseDto = {
  giveUp: QuizGiveUp | null;
};

export type CreateQuizGiveUpResponseDto = {
  giveUp: QuizGiveUp;
};

export interface GetUserProgressResponse {
  progresses: UserLessonProgress[];
  progressFraction: number;
}

export type SortDirection = "+" | "-";
export type SortMetric = "submissions" | "progress" | "streak";

export type LeaderboardSortOrder = `${SortDirection}${SortMetric}`;

export interface GetUsersReponse {
  users: LeaderBoardUser[];
}

export type LeaderBoardUser = ExtendedUser & {
  lessonProgressesCount?: number | null;
  submissionsCount?: number | null;

  streak?: number;
};

export type AchievementScope = "SUBMISSION" | "PROGRESS" | "STREAK";

export type AchievementFrequency = "ONE" | "TEN" | "HUNDRED" | "THOUSAND";

export type Achievement = {
  id: number;
  gainedAt: Date;
  frequency: AchievementFrequency;
  userId: number;
  scope: AchievementScope;
};

export type AuthStatus = "Authorized" | "UnAuthorized";
