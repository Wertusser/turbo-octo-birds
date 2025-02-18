import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { IndexerService } from './indexer/indexer.service';
import { AlchemyService } from './alchemy/alchemy.service';
import { Erc20Module } from './erc20/erc20.module';
import { Erc721Module } from './erc721/erc721.module';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeormConfig.asProvider()),
    AuthModule,
    UsersModule,
    Erc20Module,
    Erc721Module,
  ],
  providers: [IndexerService, AlchemyService],
})
export class AppModule {}
