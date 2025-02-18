import { Body, Controller, Post, Search } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { SetNameDto } from './dto/set-name.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @ApiBody({ type: SetNameDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'The name has been successfully updated.',
    type: User,
  })
  setName(@Body() setNameDto: SetNameDto): Promise<User> {
    const address = `0x0`;
    return this.usersService.setName(address, setNameDto.name);
  }

  @Search()
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
