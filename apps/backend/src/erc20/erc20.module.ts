import { Module } from '@nestjs/common';
import { Erc20Service } from './erc20.service';
import { Erc20Controller } from './erc20.controller';

@Module({
  providers: [Erc20Service],
  exports: [Erc20Service],
  controllers: [Erc20Controller],
})
export class Erc20Module {}
