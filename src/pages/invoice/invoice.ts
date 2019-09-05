import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';

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
  counter = 0;
  invoiceForm: FormGroup;
  items: FormArray;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider,
    private storage: Storage, private fb: FormBuilder, private api: ApiProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ngOnInit() {
    this.storage.get('balance').then(value => {
      this.balance = Number(value);
    });
    this.invoiceForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      date: ['', Validators.required],
      items: this.fb.array([this.createItem()])
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
    // val.value.map(key => {
    //   console.log(key);
    // });
    let titles = [];
    let descriptions = [];
    let amounts = [];
    let quantities = [];
    // console.log(this.invoiceForm.value.items);
    for (let i = 0; i < val.value.items.length; i++) {
      titles.push(val.value.items[i].title);
      descriptions.push(val.value.items[i].description);
      amounts.push(String(val.value.items[i].cost));
      quantities.push(String(val.value.items[i].quantity));
    }
    const data = {
      receiver_mail: val.value.email,
      due_date: val.value.date,
      receiver_name: val.value.name,
      // items: val.value.items
      titles: titles,
      descriptions: descriptions,
      amounts: amounts,
      quantities: quantities
    }

    console.log(data);
    this.api.newInvoice(data).subscribe((res: any) => {
      console.log(res);
      if (res.status === true) {
        this.showPopup('success', res.message);
      } else {
        this.showPopup('failure', res.message);
      }
    }, err => {
      if (err.error.status === true || err.error.status === false) {
        this.showPopup('failure', err.error.message);
      }
    });
  }

  createItem() {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  removeItem() {
    this.items.removeAt(this.items.controls.length - 1);
  }

  addItem(): void {
    this.items = this.invoiceForm.get('items') as FormArray;
    this.items.push(this.createItem());
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
