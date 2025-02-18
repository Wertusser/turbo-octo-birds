import { Injectable } from '@nestjs/common';

export type EntityTypes = 'address' | 'erc20' | 'erc721' | 'erc1155';

@Injectable()
export class IndexerService {

  async sync(address: string, entityType: EntityTypes) {
    switch (entityType) {
      case 'address':
        return await this.syncAddress(address);
      case 'erc20':
        return await this.syncERC20(address);
      case 'erc721':
        return await this.syncERC721(address);
      case 'erc1155':
        return await this.syncERC1155(address);
    }
  }
  
  private async syncAddress(address: string) {
    // sync token balances
    // sync nft ownership
  }

  private async syncERC20(address: string) {
    // check if any indexed users have this token (multicall)
    // sync token balances
  }

  private async syncERC721(address: string) {
    // supports collections with less than 15k items
    // check if any indexed users have this collection
    // sync collection's tokenURI and ownerOf
  }

  private async syncERC1155(address: string) {
    // supports collections with less than 15k items
    // check if any indexed user have this collection
    // sync collection's tokenURI and ownerOf
  }

  
}
