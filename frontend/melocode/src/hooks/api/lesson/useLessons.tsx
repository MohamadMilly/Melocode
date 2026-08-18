import type { GetLessonsResponse } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const getLessons = async (): Promise<GetLessonsResponse> => {
  const response = await apiClient.get<GetLessonsResponse>("/lessons");

  return response.data;
};

export function useLessons() {
  const { data, isLoading, error } = useQuery<
    GetLessonsResponse,
    AxiosError<{ message: "string" }>
  >({
    queryKey: ["lessons"],
    queryFn: getLessons,
  });
  const lessons = data?.lessons ?? [];

  return { lessons, isLoading, error };
}
