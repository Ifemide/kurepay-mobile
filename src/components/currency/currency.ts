import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the CurrencyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'currency',
  templateUrl: 'currency.html'
})
export class CurrencyComponent {

  selectCode = false;
  choiceCurrency: string;
  countries = [
    {
      "country": "New Zealand",
      "currency_code": "NZD"
    },
    {
      "country": "Nicaragua",
      "currency_code": "NIO"
    },
    {
      "country": "Niger",
      "currency_code": "XOF"
    },
    {
      "country": "Nigeria",
      "currency_code": "NGN"
    },
    {
      "country": "Uganda",
      "currency_code": "UGX"
    },
    {
      "country": "Ukraine",
      "currency_code": "UAH"
    },
    {
      "country": "United Arab Emirates",
      "currency_code": "AED"
    },
    {
      "country": "United Kingdom",
      "currency_code": "GBP"
    },
    {
      "country": "United States",
      "currency_code": "USD"
    },
    {
      "country": "Yemen",
      "currency_code": "YER"
    },
    {
      "country": "Yugoslavia",
      "currency_code": "YUG"
    },
    {
      "country": "Zambia",
      "currency_code": "ZMW"
    },
    {
      "country": "Zimbabwe",
      "currency_code": "ZWD"
    }
  ]

  constructor(private _data: DataProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.choiceCurrency = res;
    });
    console.log('Hello CurrencyComponent Component');
  }

  chooseCountry(val) {
    console.log(val.currency_code);
    this._data.changeCurrency(val.currency_code);
    this.showCountries();
  }

  showCountries() {
    this.selectCode = !this.selectCode;
  }

}
