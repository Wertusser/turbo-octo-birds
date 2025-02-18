import { Injectable } from '@nestjs/common';
import { Alchemy, Network } from 'alchemy-sdk';

export type Erc20Balance = {
  token: string;
  balanceUnits: string;
};

export type NftBalance = {
  collection: string;
  tokenId: string;
  name?: string;
  description?: string;
  tokenUri?: string;
};

@Injectable()
export class AlchemyService {
  async getTokenBalances(walletAddress: string): Promise<Erc20Balance[]> {
    const alchemy = new Alchemy({
      apiKey: 'demo',
      network: Network.MATIC_MAINNET,
    });

    const { tokenBalances } = await alchemy.core.getTokenBalances(
      walletAddress,
    );

    return tokenBalances.map((b) => {
      return {
        token: b.contractAddress,
        balanceUnits: b.tokenBalance,
      };
    });
  }

  async getOwnedNFTs(walletAddress: string): Promise<NftBalance[]> {
    const alchemy = new Alchemy({
      apiKey: 'demo',
      network: Network.MATIC_MAINNET,
    });

    const { ownedNfts } = await alchemy.nft.getNftsForOwner(walletAddress);
    return ownedNfts
      .map((b) => {
        return {
          collection: b.contract.address,
          tokenId: b.tokenId,
          name: b.name,
          description: b.description,
          tokenUri: b.tokenUri,
          image: b.image.pngUrl,
        };
      })
      .filter((i) => !!i.image);
  }
}
