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
  lessonId: number;
  quizAnswerId: number;
};

const giveUpToQuiz = async (quizAnswerId: number): Promise<GiveUpResponse> => {
  const response = await apiClient.post<GiveUpResponse>(
    `/me/quizzes/${quizAnswerId}/giveups`,
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
    mutationFn: ({ quizAnswerId }: GiveUpMutationArgs) =>
      giveUpToQuiz(quizAnswerId),
    onSuccess: ({ giveUp }, { lessonId }) => {
      queryClient.setQueryData<GetLessonQuizzesGiveUpsResponse>(
        ["me", "lessons", lessonId, "giveUps"],
        (old) => {
          if (!old?.giveUpsData) return old;

          return {
            ...old,
            giveUpsData: old.giveUpsData.map((group) =>
              group.id === giveUp.quizAnswerId
                ? { ...group, giveUps: [...group.giveUps, giveUp] }
                : group,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["me", "lessons", lessonId, "progress"],
        exact: true,
      });
    },

    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(`فشل في تسجيل الاستسلام: ${message}`);
    },
  });
}
