import type { ExtendedUser } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";

const getCurrentUser = async (): Promise<{ user: ExtendedUser }> => {
  const response = await apiClient.get("/me");

  return response.data;
};

export function useMe() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });

  return { isLoading, error, user: data?.user };
}
