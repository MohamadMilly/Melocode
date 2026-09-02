import type { ResponseError } from "@app/types";
import type { AxiosError } from "axios";

export function getErrorMessage(axiosError: AxiosError<ResponseError>) {
  return axiosError.response?.data.message ||
    axiosError.response?.statusText ||
    axiosError.status === 500
    ? "حدث خطأ في الخادم. يرجى المحاولة لاحقًا."
    : axiosError.message;
}
