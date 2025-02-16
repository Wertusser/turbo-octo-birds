import { JsonRpcProvider } from "ethers";
import { multicall } from "../src/multicall";
import { parseAbi } from "abitype";

const erc20Abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
]);

describe("Multicall (ethers)", () => {
  it("should return ERC20 data", async () => {
    const provider = new JsonRpcProvider("https://eth.llamarpc.com");

    const DAI = `0x6b175474e89094c44da98b954eedeac495271d0f`;

    const [symbol, decimals] = await multicall(provider, {
      contracts: [
        { abi: erc20Abi, address: DAI, functionName: `symbol`, args: [] },
        { abi: erc20Abi, address: DAI, functionName: `decimals`, args: [] },
      ],
    });

    expect(symbol.status).toBeTruthy();
    expect(decimals.status).toBeTruthy();

    expect(symbol.result).toBe("DAI");
    expect(decimals.result).toBe(18n);
  });

  it("should return ERC20 balances", async () => {
    const provider = new JsonRpcProvider("https://eth.llamarpc.com");

    const vitalik = `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`;
    const DAI = `0x6b175474e89094c44da98b954eedeac495271d0f`;
    const USDT = `0xdac17f958d2ee523a2206206994597c13d831ec7`;
    const USDC = `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`;

    const response = await multicall(provider, {
      contracts: [
        {
          abi: erc20Abi,
          address: DAI,
          functionName: `balanceOf`,
          args: [vitalik],
        },
        {
          abi: erc20Abi,
          address: USDT,
          functionName: `balanceOf`,
          args: [vitalik],
        },
        {
          abi: erc20Abi,
          address: USDC,
          functionName: `balanceOf`,
          args: [vitalik],
        },
      ],
    });

    for (const item of response) {
      expect(item.status).toBeTruthy();
      expect(item.result).toBeGreaterThan(0n);
    }
  });
});
