import { registerAs } from '@nestjs/config';

export default registerAs('jwt-config', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: '15min',
}));
