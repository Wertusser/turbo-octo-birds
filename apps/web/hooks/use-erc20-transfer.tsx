import { Token } from "@/lib/types";
import { erc20Abi, Hex, parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const useErc20Transfer = (): any => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const transferERC20 = (token: Token, to: Hex, amount: number) => {
    const amountUnits = parseUnits(String(amount), token.decimals);

    writeContract({
      address: token.address,
      abi: erc20Abi,
      functionName: "transfer",
      args: [to as Hex, amountUnits],
    });
  };

  return {
    transferERC20,
    hash,
    error,
    isConfirming,
    isConfirmed,
    isPending,
  };
};
