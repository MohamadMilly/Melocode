import type { Path, ResponseError } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const getPaths = async (): Promise<{ paths: Path[] }> => {
  const response = await apiClient.get("/paths");

  return response.data;
};

export function usePaths() {
  const { data, isLoading, error } = useQuery<
    { paths: Path[] },
    AxiosError<ResponseError>
  >({
    queryKey: ["paths"],
    queryFn: getPaths,
  });

  return { paths: data?.paths ?? [], isLoading, error };
}
