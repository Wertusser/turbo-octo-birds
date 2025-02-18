import { ApiProperty } from '@nestjs/swagger';

export class TokenBalanceDto {
  @ApiProperty({
    description: 'ERC20 token address',
    type: String,
    example: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  })
  tokenAddress: string;

  @ApiProperty({
    description: 'Corresponding token balance in token units',
    type: String,
    example: '90230000000',
  })
  balanceUnits: string;

  // @ApiProperty({
  //   description: 'Token balance as number',
  //   type: String,
  //   example: '90.23',
  // })
  // balance: number;
}
