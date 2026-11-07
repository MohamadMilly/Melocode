import type {
  GetLessonQuizzesGiveUpsResponse,
  QuizGiveUp,
  ResponseError,
} from "@app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api/api";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

type GiveUpResponse = {
  giveUp: QuizGiveUp;
};

type GiveUpMutationArgs = {
  slug: string;
  quizId: string;
};

const giveUpToQuiz = async (quizId: string): Promise<GiveUpResponse> => {
  const response = await apiClient.post<GiveUpResponse>(
    `/me/quizzes/${quizId}/giveups`,
  );

  return response.data;
};

export function useGiveUpToQuiz() {
  const queryClient = useQueryClient();

  return useMutation<
    GiveUpResponse,
    AxiosError<ResponseError>,
    GiveUpMutationArgs
  >({
    mutationKey: ["give-up-to-quiz"],
    mutationFn: ({ quizId }: GiveUpMutationArgs) => giveUpToQuiz(quizId),
    onSuccess: ({ giveUp }, { slug, quizId }) => {
      queryClient.setQueryData<GetLessonQuizzesGiveUpsResponse>(
        ["me", "lessons", slug, "giveUps"],
        (old) => {
          if (!old?.giveUpsData) return old;

          return {
            ...old,
            giveUpsData: old.giveUpsData.map((group) =>
              group.external_quizId === quizId
                ? { ...group, giveUps: [...group.giveUps, giveUp] }
                : group,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["me", "lessons", slug],
        exact: true,
      });
    },

    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(`فشل في تسجيل الاستسلام: ${message}`);
    },
  });
}
