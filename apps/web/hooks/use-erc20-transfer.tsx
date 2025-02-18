import { Token } from "@/lib/types";
import { erc20Abi, Hex, parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const useErc20Transfer = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const transferERC20 = (token: Token, address: Hex, amount: number) => {
    const amountUnits = parseUnits(String(amount), token.decimals);

    writeContract({
      address: token.address,
      abi: erc20Abi,
      functionName: "transfer",
      args: [address as Hex, amountUnits],
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
