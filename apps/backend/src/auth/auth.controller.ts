import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifySiweDto } from './dto/verify-siwe.dto';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { JwtToken } from './entites/jwt.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('jwt-siwe')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: VerifySiweDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'The JWT token  has been successfully created.',
    type: JwtToken,
  })
  verifySIWE(@Body() verifySiweDto: VerifySiweDto): Promise<JwtToken> {
    return this.authService.verifySIWE(
      verifySiweDto.address,
      verifySiweDto.signature,
    );
  }
}
