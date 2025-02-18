import { ApiProperty } from '@nestjs/swagger';

export class SetNameDto {
  @ApiProperty({
    description: '',
    type: String,
    example: 'John Doe',
  })
  name: string;
}
