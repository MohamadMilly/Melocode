import type { ResponseError } from "@app/types";
import type { AxiosError } from "axios";

export function getErrorMessage(axiosError: AxiosError<ResponseError>) {
  return (
    axiosError.response?.data.message ||
    axiosError.response?.statusText ||
    axiosError.message
  );
}
