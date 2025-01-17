import { IsIn } from 'class-validator';

export class ExchangeRateDto {
  @IsIn(['USD', 'EUR', 'PLN', 'SWD'])
  from: string;

  @IsIn(['USD', 'EUR', 'PLN', 'SWD'])
  to: string;
}
