import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeRateDto } from './types/exchange-rate.dto';
import { ExchangeRateRO } from './types/exchange-rate.ro';
import { ExchangeRateService } from './exchange-rate.service';

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  public async getExchangeRate(
    @Query() exchangeRateDto: ExchangeRateDto,
  ): Promise<ExchangeRateRO> {
    return this.exchangeRateService.getRates(exchangeRateDto);
  }
}
