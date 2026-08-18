import type {
  ResponseError,
  RegisterRequestBody,
  RegisterResponseBody,
  serverFormError,
} from "@app/types";
import { apiClient } from "../../../api/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";

const signup = async ({
  fullname,
  username,
  password,
  confirmPassword,
}: RegisterRequestBody): Promise<RegisterResponseBody> => {
  const response = await apiClient.post("/auth/register", {
    fullname,
    username,
    password,
    confirmPassword,
  });

  return response.data;
};

export function useSignup() {
  const { login: loginInStorage } = useAuth();
  const navigate = useNavigate();
  return useMutation<
    RegisterResponseBody,
    AxiosError<{ errors: serverFormError[] } | ResponseError>,
    RegisterRequestBody
  >({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (data) => {
      loginInStorage(data);
      navigate("/");
    },
  });
}
