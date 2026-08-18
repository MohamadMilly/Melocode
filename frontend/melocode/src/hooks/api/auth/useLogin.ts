import type {
  LoginRequestBody,
  LoginResponseBody,
  ResponseError,
  serverFormError,
} from "@app/types";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../../../api/api";

export const login = async ({
  username,
  password,
}: LoginRequestBody): Promise<LoginResponseBody> => {
  const response = await apiClient.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};

export function useLogin() {
  const { login: loginInStorage } = useAuth();
  const navigate = useNavigate();

  return useMutation<
    LoginResponseBody,
    AxiosError<{ errors: serverFormError[] } | ResponseError>,
    LoginRequestBody
  >({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: (data) => {
      loginInStorage(data);
      navigate("/");
    },
  });
}
