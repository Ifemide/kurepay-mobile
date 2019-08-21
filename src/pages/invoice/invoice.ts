import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {

  activeMenu = 'Invoice';
  viewBox = 'create';
  activeFilter = false;
  loader = false;
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider,
    private storage: Storage) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ngOnInit() {
    this.storage.get('balance').then(value => {
      this.balance = value;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  changeView(opt) {
    this.viewBox = opt;
  }

  doSomething() {
    console.log('do something');
    const yo = new Date();
    console.log(yo);
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
