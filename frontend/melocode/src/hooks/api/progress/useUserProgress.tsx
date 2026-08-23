import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/api";
import type { GetUserProgressResponse } from "@app/types";

const getUserProgress = async (
  userId: number,
): Promise<GetUserProgressResponse> => {
  const response = await apiClient.get(`/users/${userId}/progress`);

  return response.data;
};

export function useUserProgresses(userId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["progresses", userId],
    queryFn: () => getUserProgress(userId),
  });

  const progresses = data?.progresses ?? [];

  return {
    isLoading,
    progresses,
    error,
    progressFraction: data?.progressFraction ?? 0,
  };
}
