import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TCurrency } from '../models';
import { ICurrencyData, IFakeData } from '../models/currency.model';
import {
  API,
  API_KEY,
  CURRENCY_ARRAY,
  FAKE_DATA,
  START_CURRENCY_DATA,
} from '../constants';

@Injectable({ providedIn: 'root' })
class CurrencyService {
  private currencyArray = CURRENCY_ARRAY;
  private apiUrl = API;
  private apiKey = API_KEY;
  private base: TCurrency | null = null;
  private currencyDataSubject: BehaviorSubject<ICurrencyData> =
    new BehaviorSubject<ICurrencyData>(START_CURRENCY_DATA);
  private symbols: string = this.currencyArray.join(',');

  private fakeData: IFakeData = FAKE_DATA;
  constructor(private http: HttpClient) {}

  get currencyData$(): Observable<ICurrencyData> {
    return this.currencyDataSubject.asObservable();
  }

  setBase(base: TCurrency): void {
    this.base = base;
    this.updateCurrencyData();
  }

  updateCurrencyData(): void {
    if (this.base === null) {
      return;
    }

    const url = `${this.apiUrl}?apikey=${this.apiKey}&symbols=${this.symbols}&base=${this.base}`;

    this.http.get<ICurrencyData>(url).subscribe({
      next: (data: ICurrencyData) => {
        this.currencyDataSubject.next(data);
      },
      error: (error) => {
        console.error('Error fetching currency data:', error);
        console.log('Using fake data instead.');
        this.currencyDataSubject.next(this.fakeData[this.base as TCurrency]);
      },
    });
  }
}

export default CurrencyService;
