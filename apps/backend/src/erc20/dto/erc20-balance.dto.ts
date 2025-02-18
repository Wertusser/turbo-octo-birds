import { ApiProperty } from '@nestjs/swagger';

export class Erc20BalanceDto {
  @ApiProperty({
    description: '',
    type: String,
    example: 'John Doe',
  })
  addres: string;
}
