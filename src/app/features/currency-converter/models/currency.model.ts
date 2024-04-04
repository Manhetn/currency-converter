export type TCurrency = 'RUB' | 'USD' | 'EUR' | 'GBP';

export interface ICurrencyRates {
  [key: string]: string;
}

export interface ICurrencyData {
  date: string;
  base: TCurrency;
  rates: ICurrencyRates;
}

export interface IFakeData {
  [key: string]: ICurrencyData;
}
