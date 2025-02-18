import { Module } from '@nestjs/common';
import { Erc20Service } from './erc20.service';
import { Erc20Controller } from './erc20.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [Erc20Service],
  exports: [Erc20Service],
  controllers: [Erc20Controller],
})
export class Erc20Module {}
