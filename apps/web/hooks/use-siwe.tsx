import { $api } from "@/lib/openapi-client";
import { useCallback, useEffect, useMemo } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { createSiweMessage } from "viem/siwe";

export const useSiwe = () => {
  const { isConnected, address } = useAccount();
  const { data: signMessageData, signMessage, variables } = useSignMessage();
  const { mutate, data, error, isSuccess, isError, isPending } =
    $api.useMutation("post", "/auth/jwt-siwe");

  useEffect(() => {
    if (address && variables?.message && signMessageData) {
      mutate({ body: { address, signature: signMessageData } });
    }
  }, [address, mutate, signMessageData, variables?.message]);

  const siweMessage = useMemo(
    () => ({
      address: address as `0x${string}`,
      version: "1" as const,
      chainId: 137,
      domain: "example.com",
      uri: "http://example.com",
      nonce: "foobarbaz",
      issuedAt: new Date(0)
    }),
    [address]
  );

  const signSiwe = useCallback(() => {
    if (!isConnected || !address) return;
    const msg = createSiweMessage(siweMessage);
    signMessage({ message: msg });
  }, [isConnected, address, siweMessage, signMessage]);

  return { signSiwe, data, error, isSuccess, isError, isPending };
};
