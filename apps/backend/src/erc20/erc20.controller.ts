import { Controller, Get, UseGuards, Request, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Erc20Service } from './erc20.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Controller('erc20')
export class Erc20Controller {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private erc20Service: Erc20Service,
  ) {}
  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Owned NFTs has been successfully fetched.',
  })
  async getErc20Balance(@Request() req: any) {
    const user = req['user'] as User;
    const cacheKey = `erc20-${user.id}`;
    const value = (await this.cacheManager.get(cacheKey)) as string | undefined;
    if (value) return JSON.parse(value);

    const response = await this.erc20Service.getERC20Balances(user.address);
    await this.cacheManager.set('key', JSON.stringify(response), 500);
    return response;
  }
}
