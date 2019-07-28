import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {

  activeMenu = 'Transfer';
  viewBox = 'bank';
  otpBank = false;
  otpCrypto = false;
  otpWallet = false;
  loader = false;
  beneficiaries = false;
  banks = [
    { code: 'FSB', name: 'First Bank' },
    { code: 'ZTH', name: 'Zenith Bank' },
    { code: 'GTB', name: 'Guaranty Trust Bank' }
  ];
  cryptos = [
    { code: 'BTC', name: 'Bitcoin (BTC)' },
    { code: 'ETH', name: 'Ethereum (ETH)' },
    { code: 'DSH', name: 'Dash (DSH)' }
  ];
  benList = [
    { code: 'PER1', name: 'Person 1' },
    { code: 'PER2', name: 'Person 2' },
    { code: 'PER3', name: 'Person 3' }
  ];
  localCurrency: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferPage');
  }

  changeView(opt) {
    this.viewBox = opt;
  }

  onSubmit(boo) {
    console.log(boo.value);
    boo.reset();
    this.otpBank = false;
    this.otpCrypto = false;
    this.otpWallet = false;
  }

  showBankOTP() {
    this.otpBank = !this.otpBank;
  }

  showCryptoOTP() {
    this.otpCrypto = !this.otpCrypto;
  }

  showWalletOTP() {
    this.otpWallet = !this.otpWallet;
  }

  toggleBeneficiaries() {
    this.beneficiaries = !this.beneficiaries;
  }

}
