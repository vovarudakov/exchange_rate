import { Module } from '@nestjs/common';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ExchangeRateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
