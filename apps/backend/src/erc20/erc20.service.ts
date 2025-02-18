import { Injectable, Logger } from '@nestjs/common';
import { formatUnits, JsonRpcProvider } from 'ethers';

import ERC20_LIST from './data/erc20.json';

@Injectable()
export class Erc20Service {
  private readonly logger = new Logger(Erc20Service.name);

  async getERC20List() {
    return ERC20_LIST;
  }

  async getERC20Balances(walletAddress: string) {
    const { erc20Abi } = await import('@repo/ethers-utils/abis');
    const { multicall } = await import('@repo/ethers-utils/multicall');

    const provider = new JsonRpcProvider(process.env.RPC_URL);
    const tokenList = await this.getERC20List();

    //@ts-ignore
    const response = await multicall(provider, {
      //@ts-ignore
      contracts: tokenList.map((token) => ({
        abi: erc20Abi,
        address: token.address,
        functionName: `balanceOf`,
        args: [walletAddress],
      })),
    });

    const result = tokenList
      .map((token, i) => {
        const balance = (response[i].result as bigint) || BigInt(0);
        return {
          token,
          balanceUnits: balance.toString(),
          balance: +formatUnits(balance, token.decimals),
        };
      })
      .filter((b) => b.balance > 0);

    return result;
  }
}
