import type { Module, ResponseError } from "@app/types";
import { apiClient } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const getModules = async ({
  withLessons,
  pathSlug,
}: {
  withLessons?: boolean;
  pathSlug: string;
}): Promise<{ modules: Module[] }> => {
  const response = await apiClient.get(`/paths/${pathSlug}/modules`, {
    params: {
      include: withLessons ? "lessons" : "",
    },
  });

  return response.data;
};

export function usePathModules(slug: string, withLessons: boolean = true) {
  const { data, isLoading, error } = useQuery<
    { modules: Module[] },
    AxiosError<ResponseError>
  >({
    queryKey: ["paths", slug, "modules"],
    queryFn: () => getModules({ pathSlug: slug, withLessons }),
    enabled: Boolean(slug),
  });

  const modules = data ? data.modules : [];
  const lessons = data
    ? data.modules.flatMap((module) => module.lessons ?? [])
    : [];

  return { error, modules, lessons, isLoading };
}
