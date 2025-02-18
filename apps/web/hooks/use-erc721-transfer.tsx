import { ERC721 } from "@/lib/types";
import { erc721Abi, Hex } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export const useErc721Transfer = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const transferERC721 = (nft: ERC721, to: Hex) => {
    if (!address) throw new Error("Address not found");

    writeContract({
      address: nft.collection as Hex,
      abi: erc721Abi,
      functionName: "transferFrom",
      args: [address, to, BigInt(nft.tokenId)],
    });
  };

  return {
    transferERC721,
    hash,
    error,
    isConfirming,
    isConfirmed,
    isPending,
  };
};
