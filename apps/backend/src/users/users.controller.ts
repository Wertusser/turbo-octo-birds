import { Body, Controller, Get, Post, Search, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { SetNameDto } from './dto/set-name.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The name has been successfully updated.',
    type: User,
  })
  findOne(@Request() req): Promise<User> {
    const user = req['user'] as User;
    return this.usersService.findByAddress(user.address.toLowerCase());
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({ type: SetNameDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'The name has been successfully updated.',
    type: User,
  })
  setName(@Request() req, @Body() setNameDto: SetNameDto): Promise<User> {
    const user = req['user'] as User;
    return this.usersService.setName(user.address, setNameDto.name);
  }

  @Post('search')
  @UseGuards(AuthGuard)
  @ApiBody({ type: SearchUserDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'The name has been successfully updated.',
    type: [User],
  })
  async searchUserByName(
    @Body() searchUserDto: SearchUserDto,
  ): Promise<User[]> {
    return this.usersService.searchUser(searchUserDto.name);
  }
}
