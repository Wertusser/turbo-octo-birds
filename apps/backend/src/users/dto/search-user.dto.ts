import { ApiProperty } from '@nestjs/swagger';

export class SearchUserDto {
  @ApiProperty({
    description: '',
    type: String,
    example: 'John Doe',
  })
  name: string;
}
