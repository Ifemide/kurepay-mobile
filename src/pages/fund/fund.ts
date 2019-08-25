import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrencyComponent } from '../../components/currency/currency';
import { DataProvider } from '../../providers/data/data';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-fund',
  templateUrl: 'fund.html',
})
export class FundPage {

  @ViewChild(CurrencyComponent) currency: CurrencyComponent;
  viewBox = 'crypto';
  viewAddress = false;
  localCurrency: string;
  balance: number;
  loading = false;
  activeMenu = 'Fund';
  cryptos = [
    { id: 0, code: 'BTC', name: 'Bitcoin' },
    { id: 1, code: 'ETH', name: 'Ethereum' },
    { id: 2, code: 'DASH', name: 'Dash' }
  ];
  qrdata: string;
  // qrdata = 'coin message';
  coinName = 'bitcoin';
  popup = false;
  popupText = {
    type: '',
    text: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _data: DataProvider, private _api: ApiProvider, private storage: Storage,
    private iab: InAppBrowser, private clipboard: Clipboard) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ngOnInit() {
    this.storage.get('balance').then(value => {
      this.balance = Number(value);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FundPage');
  }

  changeView(opt) {
    this.viewBox = opt;
    this.loading = false;
  }

  // onSubmit(value) {
  //   if (value !== '') {
  //     console.log(value);
  //     if (value.crypto_currency) {
  //       this.viewAddress = value.crypto_currency;
  //       console.log(this.viewAddress);
  //     } else if (value.fund_amount) {
  //       // call another function to trigger the link to payment gateway
  //     }
  //   }
  // }

  getAddresses(id) {
    this.loading = true;
    this.viewAddress = false;
    let formData = {
      "coin_type": this.cryptos[id.crypto_currency].code,
      "coin_name": this.cryptos[id.crypto_currency].name.toLowerCase()
    }

    this._api.generateAddresses(formData).subscribe((res: any) => {
      this.loading = false;
      console.log(res);
      if (res.status === true) {
        this.qrdata = res.message;
        this.viewAddress = true;
      } else if (res.status === false) {
        this.showPopup('failure', res.message);
      }
    }, err => {
      console.log(err.error);
      this.loading = false;
      this.showPopup('failure', err.error.message);
    });
  }

  fundWithCard(data) {
    this.loading = true;
    console.log(data);
    if (data.fund_amount === undefined) {
      this.loading = false;
      this.showPopup('info', 'Please enter an amount to proceed');
    } else {
      let formData = {
        amount: data.fund_amount
      }

      this._api.fundWithCard(formData).subscribe((payload: any) => {
        this.loading = false;
        console.log(payload);
        const options: InAppBrowserOptions = {
          hidenavigationbuttons: 'yes',
          hideurlbar: 'yes',
          useWideViewPort: 'no'
        }
        if (payload.status === true) {
          this.iab.create(`${payload.paymenturl}`, '_self', options);
        } else if (payload.status === false) {
          this.showPopup('failure', payload.message);
        }
        // browser.on('loadStop');
        // cordova.InAppBrowser.open(payload.paymenturl, target, options);
      }, err => {
        console.log(err);
        this.loading = true;
        this.showPopup('failure', err.error.message);
      });
    }
  }

  showPopup(type, text) {
    this.popupText = {
      type: type,
      text: text
    };
    this.popup = true;
  }

  exitPopup() {
    this.popup = false;
  }

  copyAddress() {
    this.clipboard.copy(this.qrdata);
  }

}
