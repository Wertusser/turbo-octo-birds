import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

//TODO: fetch erc20 list from db
import * as ERC20_LIST from './data/erc20.json';

@Injectable()
export class Erc20Service {
  async getERC20List() {
    return ERC20_LIST;
  }

  async getERC20Balances(walletAddress: string) {
    const { erc20Abi } = await import('@repo/ethers-utils/abis');
    const { multicall } = await import('@repo/ethers-utils/multicall');

    const provider = new JsonRpcProvider('https://polygon.llamarpc.com');

    const tokenList = await this.getERC20List();

    //@ts-ignore
    const response = await multicall(provider, {
      //@ts-ignore
      contracts: tokenList.map((token) => ({
        abi: erc20Abi,
        address: token,
        functionName: `balanceOf`,
        args: [walletAddress],
      })),
    });

    console.log(response);
  }

  async getERC20BalanceOf(token: any, walletAddresses: string[]) {
    const { erc20Abi } = await import('@repo/ethers-utils/abis');
    const { multicall } = await import('@repo/ethers-utils/multicall');

    const provider = new JsonRpcProvider('https://polygon.llamarpc.com');

    //@ts-ignore
    const response = await multicall(provider, {
      contracts: walletAddresses.map((walletAddress) => ({
        abi: erc20Abi,
        address: token,
        functionName: `balanceOf`,
        args: [walletAddress],
      })),
    });

    console.log(response);
  }
}
