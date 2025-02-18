import { erc20Abi, erc721Abi, Hex } from "viem";
import { useAccount, useWriteContract } from "wagmi";

export const useTransfer = () => {
  const { address: owner } = useAccount();
  const { writeContract } = useWriteContract();

  return {
    transferERC20: (token: any, address: string, amount: number) => {
      writeContract({
        address: token.address,
        abi: erc20Abi,
        functionName: "transfer",
        args: [
          address as Hex,
          BigInt(Math.floor(amount * 10 ** token.decimals)),
        ],
      });
    },
    transferERC721: (collection: string, address: string, tokenId: number) => {
      writeContract({
        address: collection as Hex,
        abi: erc721Abi,
        functionName: "safeTransferFrom",
        args: [owner!, address as Hex, BigInt(tokenId)],
      });
    },
  };
};
