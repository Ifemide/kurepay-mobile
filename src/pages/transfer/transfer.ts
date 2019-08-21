import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

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
  loading = false;
  beneficiaries = false;
  localCurrency: string;
  balance: number;
  payload: any;
  bankList: any;
  accountName: any;
  account_num: any;
  local_bank: any;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };
  cryptos = [
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'ETH', name: 'Ethereum' },
    { code: 'DASH', name: 'Dash' }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider,
    private storage: Storage, private _api: ApiProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ngOnInit() {
    this.storage.get('balance').then(value => {
      this.balance = value;
    });
    this._api.bankDataJSON().subscribe((res: any) => {
      this.bankList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferPage');
  }

  changeView(opt) {
    this.viewBox = opt;
    this.loading = false;
  }

  onSubmitBank(val) {
    this.loading = true;
    console.log(val.value);
    const data = {
      accountNumber: String(val.value.account_num),
      bankCode: String(val.value.local_bank),
      amount: String(val.value.trans_amount),
      token: String(val.value.otp_bank)
    }

    this._api.transferToBank(data).subscribe((res: any) => {
      if (res.status === true) {
        this.loading = false;
        this.showPopup('success', res.message);
        val.reset();
        this.otpBank = false;
      } else if (res.status === false) {
        this.loading = false;
        val.reset();
        this.showPopup('failure', res.message);
      }
    }, err => {
      this.loading = false;
      if (err.ok === false) {
        this.showPopup('failure', err.statusText);
      }
    });
  }

  getAccountName(account, bank) {
    if (account && bank) {
      this.loading = true;
      const data = {
        settlement_bank: String(bank),
        account_number: String(account)
      }

      this._api.getAccountName(data).subscribe((res: any) => {
        if (res.status === 'success') {
          this.loading = false;
          this.accountName = res.data;
        } else {
          this.loading = false;
          this.showPopup('failure', res.message);
        }
      }, err => {
        console.log(err);
        if (err.status === 0 && err.ok === false) {
          this.loading = false;
          this.showPopup('failure', 'Please check your account details and try again!');
        }
      });
    }
  }

  onSubmitCrypto(boo) {
    this.loading = true;
    const formData = {
      "coin_type": boo.value.crypto_currency,
      "address": boo.value.wallet_address,
      "amount": boo.value.amount_to_transfer,
      "token": boo.value.otp_crypto
    }

    console.log(formData);
    this._api.transferToCrypto(formData).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      boo.reset();
      this.otpCrypto = false;
      if (res.status === true) {
        this.showPopup('success', res.message);
      } else {
        this.showPopup('failure', res.message);
      }
    }, err => {
      this.loading = false;
      console.log(err.error);
      if (err.error.message) {
        this.showPopup('failure', err.error.message);
      }
      if (err.message) {
        this.showPopup('failure', err.message);
      }
    });
  }

  onSubmitWallet(foo) {
    this.loading = true;
    const formData = {
      "email": foo.value.recipient_email,
      "amount": foo.value.amount_to_transfer,
      "token": foo.value.otp_wallet
    }

    console.log(formData);
    this._api.transferToWallet(formData).subscribe((res: any) => {
      this.loading = false;
      foo.reset();
      this.otpWallet = false;
      if (res.status === true) {
        this.showPopup('success', res.message);
        this.balance = res.balance;
        this.storage.set('balance', res.balance);
      } else {
        this.showPopup('failure', res.message);
      }
    }, err => {
      this.loading = false;
      console.log(err);
      if (err.error) {
        console.log(err.error);
        this.showPopup('failure', err.error.message);
      } else if (err.ok === false) {
        console.log(err.status + ' ' + err.statusText);
        this.showPopup('failure', err.statusText);
      }
    });
  }

  showBankOTP() {
    this.loading = true;
    this._api.generateToken().subscribe(load => {
      this.loading = false;
      console.log(load);
      this.payload = load;
      this.otpBank = !this.otpBank;
    });
  }

  showCryptoOTP() {
    this.loading = true;
    this._api.generateToken().subscribe(load => {
      this.loading = false;
      console.log(load);
      this.payload = load;
      this.otpCrypto = !this.otpCrypto;
    });
  }

  showWalletOTP() {
    this.loading = true;
    this._api.generateToken().subscribe(load => {
      this.loading = false;
      console.log(load);
      this.payload = load;
      this.otpWallet = !this.otpWallet;
    });
  }

  toggleBeneficiaries() {
    this.beneficiaries = !this.beneficiaries;
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

}
