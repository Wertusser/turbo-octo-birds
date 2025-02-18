import { Hex } from "viem";

export type User = {
  id: number;
  address: Hex;
  name?: string;
};

export type Token = {
  address: Hex;
  decimals: number;
  name: string;
  symbol: string;
  imageUrl?: string;
};

export type TokenBalance = {
  token: Token;
  balanceUnits: string;
  balance: number;
};
