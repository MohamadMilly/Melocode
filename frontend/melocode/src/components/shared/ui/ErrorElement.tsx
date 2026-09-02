import type { ResponseError } from "@app/types";
import type { AxiosError } from "axios";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { Text } from "@radix-ui/themes";
import { CircleX } from "lucide-react";

export function ErrorElement({
  axiosError,
}: {
  axiosError: AxiosError<ResponseError>;
}) {
  const message = getErrorMessage(axiosError);
  return (
    <Text
      as="p"
      dir="auto"
      className="text-red-600 selection:bg-red-600/20! flex items-center gap-1 p-2 rounded-md text-sm bg-red-400/10"
    >
      <CircleX size={18} />
      {message}
    </Text>
  );
}
