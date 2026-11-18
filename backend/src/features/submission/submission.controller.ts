import type {
  CreateQuizSubmissionResponse,
  CreateSubmissionRequestBody,
} from "@app/types";
import type { Response } from "express";
import type { QuizIdParams } from "../../shared/types/quizHttp.js";
import type { AuthenticatedRequest } from "../../shared/types/auth.types.js";
import * as submissionService from "./submission.service.js";

export const createSubmission = async (
  req: AuthenticatedRequest<QuizIdParams, unknown, CreateSubmissionRequestBody>,
  res: Response<CreateQuizSubmissionResponse>,
) => {
  const userId = req.currentUser?.id as number;
  const { external_quizId } = req.params;
  const { content, language, userOutputs, type } = req.body;

  const submission = await submissionService.createSubmission({
    content,
    language,
    external_quizId,
    userOutputs,
    type: type ?? "CODING",
    userId,
  });

  return res.status(201).json({ submission });
};
