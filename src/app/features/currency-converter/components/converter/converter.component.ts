import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { CurrencyService } from '../../services';
import { TCurrency } from '../../models';
import { ICurrencyData } from '../../models/currency.model';
import { CURRENCY_ARRAY } from '../../constants';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, NgClass, NgIf],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent {
  public conversionForm: FormGroup;

  public currencyArray: TCurrency[] = CURRENCY_ARRAY;
  private currentCurrencyData: ICurrencyData | null = null;
  private rate: number = 0;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.conversionForm = this.fb.group({
      fromAmount: [1.0],
      toAmount: [0.0],
      fromCurrency: [this.currencyArray[1]],
      toCurrency: [this.currencyArray[0]],
    });
  }

  ngOnInit() {
    this.currencyService.setBase(this.fromCurrencyControl.value);
    this.currencyService.currencyData$.subscribe((data) => {
      this.currentCurrencyData = data;
      this.rate = Number(
        this.currentCurrencyData.rates[
          this.toCurrencyControl.value as TCurrency
        ]
      );
      this.toAmountControl.setValue(
        (this.fromAmountControl.value * this.rate).toFixed(2)
      );
    });
  }

  public get fromAmountControl(): FormControl {
    return this.conversionForm.get('fromAmount') as FormControl;
  }

  public get toAmountControl(): FormControl {
    return this.conversionForm.get('toAmount') as FormControl;
  }

  public get fromCurrencyControl(): FormControl {
    return this.conversionForm.get('fromCurrency') as FormControl;
  }

  public get toCurrencyControl(): FormControl {
    return this.conversionForm.get('toCurrency') as FormControl;
  }

  onChangeFromAmount() {
    this.toAmountControl.setValue(
      (this.fromAmountControl.value * this.rate).toFixed(2),
      { emitEvent: false }
    );
  }

  onChangeToAmount() {
    this.fromAmountControl.setValue(
      (this.toAmountControl.value / this.rate).toFixed(2),
      { emitEvent: false }
    );
  }

  onChangeFromCurrency(value: TCurrency) {
    this.currencyService.setBase(value);
  }

  onChangeToCurrency(value: TCurrency) {
    this.rate = Number(this.currentCurrencyData?.rates[value]);
    this.toAmountControl.setValue(
      (this.fromAmountControl.value * this.rate).toFixed(2)
    );
  }

  onReverCurrency() {
    const newFromCurrencyControl = this.toCurrencyControl.value;
    const newtoCurrency = this.fromCurrencyControl.value;

    this.fromCurrencyControl.setValue(newFromCurrencyControl);
    this.toCurrencyControl.setValue(newtoCurrency);
  }
}
