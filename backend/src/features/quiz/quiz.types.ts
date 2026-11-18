import { QuizSubmissionType, UserQuizOutput } from "@app/types";

export type SaveSubmissionInput = {
  content: string;
  language: string | null | undefined;
  external_quizId: string;
  userOutputs: UserQuizOutput[];
  userId: number;
  type: QuizSubmissionType;
};
