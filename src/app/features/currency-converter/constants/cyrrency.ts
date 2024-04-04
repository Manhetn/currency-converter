import { TCurrency } from '../models';
import { ICurrencyData, IFakeData } from '../models/currency.model';

export const CURRENCY_ARRAY: TCurrency[] = ['RUB', 'USD', 'EUR', 'GBP'];

export const START_CURRENCY_DATA: ICurrencyData = {
  date: '',
  base: 'USD',
  rates: {
    RUB: '1',
    EUR: '1',
    GBP: '1',
    USD: '1',
  },
};

export const FAKE_DATA: IFakeData = {
  EUR: {
    date: '2024-04-04 00:00:00+00',
    base: 'EUR',
    rates: {
      EUR: '1.0',
      GBP: '0.856962916259987',
      USD: '1.083802828026875',
      RUB: '99.7668686189174',
    },
  },
  GBP: {
    date: '2024-04-04 00:00:00+00',
    base: 'GBP',
    rates: {
      EUR: '1.167115170056202',
      GBP: '1.0',
      USD: '1.269080702758807',
      RUB: '116.66594983121435',
    },
  },
  RUB: {
    date: '2024-04-04 00:00:00+00',
    base: 'RUB',
    rates: {
      EUR: '0.010025815130609315',
      GBP: '0.008574981324359808',
      USD: '0.010859010363363833',
      RUB: '1.0',
    },
  },
};
