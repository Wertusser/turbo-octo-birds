import { ApiProperty } from '@nestjs/swagger';
import { ERC20Dto } from './erc20.dto';

export class ERC20BalanceDto {
  token: ERC20Dto;
  
  @ApiProperty({
    description: 'Corresponding token balance in token units',
    type: String,
    example: '90230000000',
  })
  balanceUnits: string;

  @ApiProperty({
    description: 'Token balance as number',
    type: String,
    example: '90.23',
  })
  balance: number;
}
