import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrencyComponent } from '../../components/currency/currency';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {

  @ViewChild(CurrencyComponent) currency: CurrencyComponent;
  loader = false;
  viewBox = 'cable';
  activeMenu = 'Bills';
  packages = [
    { code: 'OP1', name: 'Option1' },
    { code: 'OP2', name: 'Option2' },
    { code: 'OP3', name: 'Option3)' }
  ];
  bouquets = [
    { code: 'OP1', name: 'Option1' },
    { code: 'OP2', name: 'Option2' },
    { code: 'OP3', name: 'Option3)' }
  ];
  providers = [
    { code: 'OP1', name: 'Option1' },
    { code: 'OP2', name: 'Option2' },
    { code: 'OP3', name: 'Option3)' }
  ];
  meters = [
    { type: 'OP1', name: 'Option1' },
    { type: 'OP2', name: 'Option2' },
    { type: 'OP3', name: 'Option3)' }
  ];
  localCurrency: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillsPage');
    console.log(this.currency.choiceCurrency);
  }

  changeView(opt) {
    this.viewBox = opt;
  }

  onSubmit(value) {
    console.log(value);
  }

}
