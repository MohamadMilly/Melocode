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
  quizId: string;
}

interface MutationArgs extends SubmitArgs {
  slug: string;
}

const saveSubmission = async ({
  quizId,
  ...body
}: SubmitArgs): Promise<CreateQuizSubmissionResponse> => {
  const { data } = await apiClient.post<CreateQuizSubmissionResponse>(
    `/quizzes/${quizId}/submissions`,
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
    
    mutationFn: ({ slug, ...args }: MutationArgs) => saveSubmission(args),

    onSuccess: (data, { slug, quizId }) => {
      const progressKey = ["me", "lessons", slug, "submissions"];
      const newSubmission = data.submission;

      queryClient.setQueryData<GetLessonQuizzesSubmissionsResponse>(
        progressKey,
        (old) => {
          if (!old?.submissionsData) return old;

          const updatedSubmissionsData = old.submissionsData.map((group) => {
            if (group.external_quizId !== quizId) return group;

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
        queryKey: ["quizzes", quizId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["me", "lessons", slug],
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
