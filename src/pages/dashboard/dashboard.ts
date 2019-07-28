import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  loader = false;
  activeMenu = 'Dashboard';
  localCurrency: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
