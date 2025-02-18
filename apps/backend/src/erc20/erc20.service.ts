import { Injectable } from '@nestjs/common';

@Injectable()
export class Erc20Service {
  async getERC20List() {}
  async getERC20Balances(walletAddress: string) {}
  async getERC20BalanceOf(token: any, walletAddresses: string[]) {}
}
