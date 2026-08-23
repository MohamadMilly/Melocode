import type { ExtendedUser } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";

const getCurrentUser = async (): Promise<{ user: ExtendedUser }> => {
  const response = await apiClient.get("/me");

  return response.data;
};

export function useMe() {
  const { user: storageUser } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled: !!storageUser,
  });

  return { isLoading, error, user: data?.user };
}
