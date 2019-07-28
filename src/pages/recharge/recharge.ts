import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {

  activeMenu = 'Recharge';
  viewBox = 'airtime';
  loader = false;
  localCurrency: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargePage');
  }

  changeView(opt) {
    this.viewBox = opt;
  }

  onSubmit(value) {
    console.log(value);
  }

}
