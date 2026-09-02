import type { Achievement, ResponseError } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const getAchievements = async (): Promise<{ achievements: Achievement[] }> => {
  const response = await apiClient.get("/me/achievements");

  return response.data;
};

export function useMyAchievements() {
  const { data, isLoading, error } = useQuery<
    { achievements: Achievement[] },
    AxiosError<ResponseError>
  >({
    queryKey: ["me", "achievements"],
    queryFn: getAchievements,
  });

  useEffect(() => {
    if (error) {
      toast.error(`فشل في جلب الإنجازات: ${getErrorMessage(error)}`);
    }
  }, [error]);

  const achievements = data?.achievements ?? [];

  return { achievements, isLoading, error };
}
