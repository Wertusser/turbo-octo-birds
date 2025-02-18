import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { SetNameDto } from './dto/set-name.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('name')
  @ApiBody({ type: SetNameDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'The name has been successfully updated.',
    type: User,
  })
  setName(@Body() verifySiweDto: SetNameDto): Promise<User> {
    const address = `0x0`;
    return this.usersService.setName(address, verifySiweDto.name);
  }


  @Post('search')
  @ApiBody({ type: SearchUserDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'The name has been successfully updated.',
    type: User,
  })
  async searchUserByName(@Body() verifySiweDto: SetNameDto): Promise<User[]> {
    return [];
  }

  @Get('erc20-balance')
  async getERC20Balances(): Promise<number> {
    return 1;
  }

  @Get('erc721-balance')
  async getERC721(): Promise<number> {
    return 1;
  }

  @Get('erc1155-balance')
  async getERC1155(): Promise<number> {
    return 1;
  }
}
