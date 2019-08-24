import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
  // template: `
  //   <template #temp>
  //       <h1 [ngStyle]="{background: 'green'}">Test</h1>
  //       <p *ngIf="bla">Im not visible</p>   
  //   </template>
  //   <template [ngTemplateOutlet]="temp"></template>
  //   <template [ngTemplateOutlet]="temp"></template>
  //   `
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
  items = [];
  counter = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider,
    private storage: Storage) {
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
    console.log('ionViewDidLoad InvoicePage');
  }

  changeView(opt) {
    this.viewBox = opt;
  }

  createInvoice(val) {
    console.log(val.value);
  }

  newItem() {
    // console.log('do something');
    // const yo = new Date();
    // console.log(yo);
    // this.items.push(`<input type="text" placeholder="hi">`);
    // console.log(this.items);
    document.getElementsByClassName('kure-form2')[0].innerHTML += `<div class="form-inputs">
          <div class="text-input">
            <label>Item Title</label>
            <input type="text" name="item_title${this.counter}" [(ngModel)]="item_title${this.counter}" placeholder="Enter title">
          </div>
          <div class="text-input">
            <label>Item Description</label>
            <input type="text" name="item_desc${this.counter}" [(ngModel)]="item_desc${this.counter}" placeholder="Enter item's short description">
          </div>
          <div class="text-input">
            <label>Item Cost ({{ localCurrency }})</label>
            <input type="number" name="item_cost${this.counter}" [(ngModel)]="item_cost${this.counter}" placeholder="Enter item cost">
          </div>
          <div class="text-input">
            <label>Item Quantity</label>
            <input type="number" name="item_quantity${this.counter}" [(ngModel)]="item_quantity${this.counter}" placeholder="Enter item quantity">
          </div>
        </div>`
    this.counter++;
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
