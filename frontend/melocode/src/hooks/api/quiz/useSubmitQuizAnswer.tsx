import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api/api";
import type {
  CreateQuizSubmissionResponse,
  CreateSubmissionRequestBody,
  GetLessonQuizzesSubmissionsResponse,
  ResponseError,
} from "@app/types";
import type { AxiosError } from "axios";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { toast } from "react-hot-toast";

interface SubmitArgs extends CreateSubmissionRequestBody {
  quizAnswerId: number;
}

interface MutationArgs extends SubmitArgs {
  lessonId: number;
}

const saveSubmission = async ({
  quizAnswerId,
  ...body
}: SubmitArgs): Promise<CreateQuizSubmissionResponse> => {
  const { data } = await apiClient.post<CreateQuizSubmissionResponse>(
    `/quizzes/${quizAnswerId}/submissions`,
    body,
  );
  return data;
};

export function useSubmitQuizAnswer() {
  const queryClient = useQueryClient();

  return useMutation<
    CreateQuizSubmissionResponse,
    AxiosError<ResponseError>,
    MutationArgs
  >({
    mutationKey: ["submit-quiz-answer"],

    mutationFn: ({ lessonId, ...args }: MutationArgs) => saveSubmission(args),

    onSuccess: (data, { lessonId, quizAnswerId }) => {
      const progressKey = ["me", "lessons", lessonId, "submissions"];
      const newSubmission = data.submission;

      queryClient.setQueryData<GetLessonQuizzesSubmissionsResponse>(
        progressKey,
        (old) => {
          if (!old?.submissionsData) return old;

          const updatedSubmissionsData = old.submissionsData.map((group) => {
            if (group.id !== newSubmission.quizAnswerId) return group;

            const hasCorrectSubmission = group.submissions.some(
              (s) => s.isCorrect,
            );
            const hasInCorrectSubmission = group.submissions.some(
              (s) => !s.isCorrect,
            );

            let nextSubmissions;

            const isFirstCorrect =
              !hasCorrectSubmission && newSubmission.isCorrect;
            const isFirstIncorrect =
              !hasInCorrectSubmission && !newSubmission.isCorrect;

            if (isFirstCorrect || isFirstIncorrect) {
              nextSubmissions = [...group.submissions, newSubmission];
            } else {
              nextSubmissions = group.submissions.map((s) =>
                s.id === newSubmission.id ? newSubmission : s,
              );
            }

            return { ...group, submissions: nextSubmissions };
          });

          return { ...old, submissionsData: updatedSubmissionsData };
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["quizzes", quizAnswerId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["me", "lessons", lessonId, "progress"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["me", "achievements"],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Failed submitting answer:", error);
      toast.error(`فشل في ارسال الاجابة ${getErrorMessage(error)}`);
    },
  });
}
