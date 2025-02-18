import { ApiProperty } from '@nestjs/swagger';

export class JwtToken {
  @ApiProperty({ description: 'JWT token' })
  access_token: string;
}
