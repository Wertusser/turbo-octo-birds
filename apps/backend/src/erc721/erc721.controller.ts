import { Controller, Get, UseGuards, Request, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../users/entities/user.entity';
import { Erc721Service } from './erc721.service';
import { AlchemyService } from 'src/alchemy/alchemy.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Controller('erc721')
export class Erc721Controller {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private alchemyService: AlchemyService,
    private erc721Service: Erc721Service,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Owned NFTs has been successfully fetched.',
  })
  async getOwnedErc721(@Request() req: any) {
    const user = req['user'] as User;
    const cacheKey = `erc721-${user.id}`;
    const value = (await this.cacheManager.get(cacheKey)) as string | undefined;
    if (value) return JSON.parse(value);

    const response = await this.alchemyService.getOwnedNFTs(user.address);
    await this.cacheManager.set('key', JSON.stringify(response), 5000);
    return response;
  }
}
