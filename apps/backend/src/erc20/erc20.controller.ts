import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Erc20Service } from './erc20.service';

@Controller('erc20')
export class Erc20Controller {
  constructor(private erc20Service: Erc20Service) {}
  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Owned NFTs has been successfully fetched.',
  })
  async getErc20Balance(@Request() req: any) {
    const user = req['user'] as User;
    return this.erc20Service.getERC20Balances(user.address);
  }
}
