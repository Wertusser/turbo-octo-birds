import { JsonRpcProvider } from "ethers";
import { multicall } from "../src/multicall";
import { RoundRobinProvider } from "../src/providers/round-robin";
import { parseAbi } from "abitype";

jest.setTimeout(100000);

const erc20Abi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
]);

const erc721Abi = parseAbi([
  "function ownerOf(uint256) view returns (address)",
  "function tokenURI(uint256) view returns (string)",
]);

const range = (minNumber: number, count: number) =>
  [...Array(count).keys()].map((i) => i + minNumber);

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

    expect(symbol.status).toBe("success");
    expect(decimals.status).toBe("success");

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
      expect(item.status).toBe("success");
      expect(item.result).toBeGreaterThan(0n);
    }
  });

  it("should return ERC721 owners", async () => {
    // TODO: to run this test successfully - add secure rpc urls
    const rpcUrls = ["https://polygon.llamarpc.com"];

    const provider = new RoundRobinProvider(
      rpcUrls.map((url) => new JsonRpcProvider(url))
    );
    const collection = `0x4f347d05812c012ca469160ffe7c46d85e9b3fde` as const;
    const totalSupply = 9912;
    // const totalSupply = 500;

    const response = await multicall(provider, {
      contracts: range(1, totalSupply).map((id) => ({
        abi: erc721Abi,
        address: collection,
        functionName: `tokenURI`,
        args: [BigInt(id)],
      })),
      batchSize: 2048,
    });

    for (const item of response) {
      expect(item.status).toBe("success");
    }
  });
});
