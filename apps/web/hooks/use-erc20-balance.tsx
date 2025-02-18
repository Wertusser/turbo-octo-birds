import { $api } from "@/lib/openapi-client";

export const useERC20Balances = (accessToken: string) => {
  return $api.useQuery("get", "/erc20", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
