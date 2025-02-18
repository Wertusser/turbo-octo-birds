import { ApiProperty } from '@nestjs/swagger';

export class ERC20Dto {
  @ApiProperty({
    description: 'Token name',
    type: String,
    example: 'USD Coin',
  })
  name: string;

  @ApiProperty({
    description: 'Token name',
    type: String,
    example: 'USDC',
  })
  symbol: string;

  @ApiProperty({
    description: 'Token address',
    type: String,
    example: '',
  })
  address: string;

  @ApiProperty({
    description: 'Token decimals',
    type: Number,
    example: '18',
  })
  decimals: number;
}
