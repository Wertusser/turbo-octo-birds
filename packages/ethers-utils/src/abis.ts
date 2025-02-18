import { parseAbi } from "abitype";

export const erc20Abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
]);

export const erc721Abi = parseAbi([
  "function ownerOf(uint256) view returns (address)",
  "function tokenURI(uint256) view returns (string)",
]);
