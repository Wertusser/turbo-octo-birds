import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { IndexerService } from './indexer/indexer.service';
import { AlchemyService } from './alchemy/alchemy.service';
import { Erc20Service } from './erc20/erc20.service';
import { Erc721Service } from './erc721/erc721.service';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeormConfig.asProvider()),
    AuthModule,
    UsersModule,
  ],
  providers: [IndexerService, AlchemyService, Erc20Service, Erc721Service],
})
export class AppModule {}
