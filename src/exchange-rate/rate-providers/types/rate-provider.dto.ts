export class RateProviderDto {
  data: { base: string; rate: number; target: string; timestamp: number };
  statusText: string;
  code: number;
}
