import type { GetUsersReponse, LeaderboardSortOrder } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";

const getUsers = async <T extends LeaderboardSortOrder>(
  sortBy: T,
): Promise<GetUsersReponse> => {
  const response = await apiClient.get("/users", {
    params: { sortBy },
  });

  return response.data;
};

export function useUsers(sortBy: LeaderboardSortOrder) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", sortBy],
    queryFn: () => getUsers(sortBy),
    enabled: !!sortBy,
  });

  const users = data?.users ?? [];

  return { isLoading, error, users };
}
