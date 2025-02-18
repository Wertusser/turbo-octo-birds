import { $api } from "@/lib/openapi-client";

export const useOwnedNfts = (accessToken: string) => {
  return $api.useQuery("get", "/erc721", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
