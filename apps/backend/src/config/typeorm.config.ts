import { registerAs } from '@nestjs/config';

export default registerAs('typeorm-config', () => ({
  type: 'postgres' as const,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
}));
