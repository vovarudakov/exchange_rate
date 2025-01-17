import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange-rate.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExchangeRateService } from './exchange-rate.service';
import { SecondRateProvider } from './rate-providers/second.rate-provider';
import { SwingDevInstituteRateProvider } from './rate-providers/swing-dev-institute.rate-provider';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('SWING_DEV_INSTITUTE_BASE_URL'),
        timeout: configService.get('TIMEOUT', 10000),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ExchangeRateController],
  providers: [
    ExchangeRateService,
    SecondRateProvider,
    SwingDevInstituteRateProvider,
    {
      provide: 'RateProviders',
      useFactory: (SwingDevInstituteRateProvider, SecondRateProvider) => [
        SwingDevInstituteRateProvider,
        SecondRateProvider,
      ],
      inject: [SwingDevInstituteRateProvider, SecondRateProvider],
    },
  ],
})
export class ExchangeRateModule {}
