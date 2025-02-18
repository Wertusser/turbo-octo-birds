import { $api } from "@/lib/openapi-client";

export const useName = (accessToken: string) => {
  const {data: user} = $api.useQuery("get", "/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const { mutate, data: userMutated } = $api.useMutation("post", "/user");

  return {
    name: userMutated?.name || user?.name || "",
    setName: (name: string) =>
      mutate({
        body: { name },
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
  };
};
