import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { SwingDevRates } from './types/swing-dev.rates';
import { RateProviderInterface } from './interfaces/rate-provider.interface';
import { RateProviderDto } from './types/rate-provider.dto';
import { ExchangeRateDto } from '../types/exchange-rate.dto';

@Injectable()
export class SecondRateProvider implements RateProviderInterface {
  constructor(private readonly httpService: HttpService) {}

  public async getRates(
    exchangeRateDto: ExchangeRateDto,
  ): Promise<RateProviderDto> {
    console.log('second provider');
    let response: AxiosResponse<SwingDevRates>;
    try {
      response = await firstValueFrom(
        this.httpService.get('rates', {
          params: {
            base: exchangeRateDto.from,
            target: exchangeRateDto.to,
          },
        }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error.message);
      return {
        data: null,
        statusText: error.response.statusText,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }

    return {
      data: {
        base: response.data.base,
        rate: response.data.rate,
        target: response.data.target,
        timestamp: response.data.timestamp,
      },
      statusText: response.statusText,
      code: response.status,
    };
  }
}