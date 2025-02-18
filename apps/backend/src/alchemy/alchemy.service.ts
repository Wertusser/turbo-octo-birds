import { Injectable } from '@nestjs/common';
import { Alchemy, Network } from 'alchemy-sdk';
import { TokenBalanceDto } from './dto/token-balance.dto';
import { OwnedNftDto } from './dto/owned-nft.dto';

@Injectable()
export class AlchemyService {
  async getTokenBalances(walletAddress: string): Promise<TokenBalanceDto[]> {
    const alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.MATIC_MAINNET,
    });

    const { tokenBalances } = await alchemy.core.getTokenBalances(
      walletAddress,
    );

    return tokenBalances.map((b) => {
      return {
        tokenAddress: b.contractAddress,
        balanceUnits: b.tokenBalance,
      };
    });
  }

  async getOwnedNFTs(walletAddress: string): Promise<OwnedNftDto[]> {
    const alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
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
