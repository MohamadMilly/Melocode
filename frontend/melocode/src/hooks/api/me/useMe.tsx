import type { ExtendedUser, ResponseError } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const getCurrentUser = async (): Promise<{ user: ExtendedUser }> => {
  const response = await apiClient.get("/me");

  return response.data;
};

export function useMe() {
  const { user: storageUser } = useAuth();
  const { data, isLoading, error } = useQuery<
    { user: ExtendedUser },
    AxiosError<ResponseError>
  >({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled: !!storageUser,
  });

  useEffect(() => {
    if (error) {
      toast.error(`فشل في جلب بيانات المستخدم: ${getErrorMessage(error)}`);
    }
  }, [error]);

  return { isLoading, error, user: data?.user };
}
