import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrencyComponent } from '../../components/currency/currency';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-fund',
  templateUrl: 'fund.html',
})
export class FundPage {

  @ViewChild(CurrencyComponent) currency: CurrencyComponent;
  viewBox = 'crypto';
  viewAddress = '';
  localCurrency: string;
  activeMenu = 'Fund';
  loader = false;
  cryptos = [
    { code: 'BTC', name: 'Bitcoin (BTC)' },
    { code: 'ETH', name: 'Ethereum (ETH)' },
    { code: 'DSH', name: 'Dash (DSH)' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FundPage');

  }

  changeView(opt) {
    this.viewBox = opt;
  }

  onSubmit(value) {
    if (value !== '') {
      console.log(value);
      if (value.crypto_currency) {
        this.viewAddress = value.crypto_currency;
        console.log(this.viewAddress);
      } else if (value.fund_amount) {
        // call another function to trigger the link to payment gateway
      }
    }
  }

}
