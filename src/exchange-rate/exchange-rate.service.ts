import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ExchangeRateRO } from './types/exchange-rate.ro';
import { RateProviderInterface } from './rate-providers/interfaces/rate-provider.interface';
import { ExchangeRateDto } from './types/exchange-rate.dto';
import { RateProviderDto } from './rate-providers/types/rate-provider.dto';

@Injectable()
export class ExchangeRateService {
  private LAST_CALLED_PROVIDER_INDEX = 0;

  constructor(
    @Inject('RateProviders') private rateProviders: RateProviderInterface[],
  ) {}

  public async getRates(
    exchangeRateDto: ExchangeRateDto,
  ): Promise<ExchangeRateRO> {
    const startingProviderIndex =
      (this.LAST_CALLED_PROVIDER_INDEX + 1) % this.rateProviders.length;

    let rates: RateProviderDto | null = null;
    for (
      let i = startingProviderIndex;
      i < this.rateProviders.length + startingProviderIndex;
      i++
    ) {
      const response =
        await this.rateProviders[i % this.rateProviders.length].getRates(
          exchangeRateDto,
        );
      if (response.code == 200) {
        rates = response;
        break;
      }
    }

    this.LAST_CALLED_PROVIDER_INDEX++;

    if (rates == null) {
      throw new HttpException(
        "rates couldn't be fetched",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return rates.data;
  }
}
