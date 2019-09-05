import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  loader = false;
  activeMenu = 'Dashboard';
  localCurrency: string;
  balance: number;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };
  countTX: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider,
    private storage: Storage, private api: ApiProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ngOnInit() {
    this.api.updateWalletCrypto().subscribe((res: any) => {
      if (res.status === true) console.log(res.message)
    }, err => { if (err.error.status) this.showPopup('info', err.error.message); });

    this.storage.get('balance').then(value => this.balance = value);
    this.api.authUser().subscribe((res: any) => {
      this.balance = res.data.balance;
      this._data.changeCurrency(res.data.localCurrency);
      this.storage.set('balance', res.data.balance);
    });

    this.api.allTransactions().subscribe((res: any) => {
      if (res.status === true) {
        this.countTX = res.data.length;
        console.log(this.countTX);
      }
    }, err => { if (!err.error.status) this.showPopup('failure', err.error.message) });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goToPage(title, tab) {
    this.navCtrl.setRoot(title + 'Page', {
      tab: tab
    });
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
