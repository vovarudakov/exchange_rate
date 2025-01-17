import { ExchangeRateDto } from '../../types/exchange-rate.dto';
import { RateProviderDto } from '../types/rate-provider.dto';

export interface RateProviderInterface {
  getRates(exchangeRateDto: ExchangeRateDto): Promise<RateProviderDto>;
}
