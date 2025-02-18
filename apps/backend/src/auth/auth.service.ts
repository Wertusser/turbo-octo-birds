import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './entites/jwt.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async verifySIWE(address: string, signature: string): Promise<JwtToken> {
    const { verifySiweMessage } = await import('@repo/ethers-utils/siwe');

    const siweMessage = {
      address: address as `0x${string}`,
      version: '1' as const,
      chainId: 137,
      domain: 'example.com',
      uri: 'http://example.com',
      nonce: 'foobarbaz',
      issuedAt: new Date(0)
    };

    if (!verifySiweMessage(siweMessage, signature)) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOrCreate(address);
    const token = new JwtToken();
    token.access_token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.name,
      address: user.address,
    });
    return token;
  }
}
