import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  activeMenu = 'Transactions';
  activeFilter = false;
  loading = true;
  public minDate: Date = new Date("05/07/2000");
  public maxDate: Date = new Date();
  public dateValue: Date = new Date();
  localCurrency: string;
  balance: number;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };
  transactions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider,
    private storage: Storage, private api: ApiProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ngOnInit() {
    this.storage.get('balance').then(value => {
      this.balance = value;
    });
    this.api.allTransactions().subscribe((res: any) => {
      if (res.status) {
        this.loading = false;
        this.transactions = res.data;
      } else if (!res.status) {
        this.loading = false;
        this.showPopup('failure', res.message);
      }
    }, err => {
      if (!err.error.status) {
        this.loading = false;
        this.showPopup('failure', err.error.message);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

  showFilter() {
    this.activeFilter = !this.activeFilter;
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
