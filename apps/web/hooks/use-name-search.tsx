import { $api } from "@/lib/openapi-client";

export const useNameSearch = (accessToken: string) => {
  const { mutateAsync, data: queryResult } = $api.useMutation("post", "/user/search");

  return {
    queryResult: queryResult ?? [],
    search: (name: string) =>
      mutateAsync({
        body: { name },
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
  };
};
