import { $api } from "@/lib/openapi-client";

export const useName = (accessToken: string) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = $api.useQuery("get", "/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const {
    mutateAsync,
    data: userMutated,
    isSuccess,
  } = $api.useMutation("post", "/user");

  return {
    name: userMutated?.name || user?.name || "",
    isLoading,
    isError,
    error,
    nameUpdated: isSuccess,
    setName: (name: string) => {
      mutateAsync({
        body: { name },
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then(() => refetch());
    },
  };
};
