import { Module } from '@nestjs/common';
import { Erc721Service } from './erc721.service';
import { Erc721Controller } from './erc721.controller';
import { AlchemyService } from 'src/alchemy/alchemy.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [AlchemyService, Erc721Service],
  exports: [Erc721Service],
  controllers: [Erc721Controller],
})
export class Erc721Module {}
