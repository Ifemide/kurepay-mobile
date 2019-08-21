import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrencyComponent } from '../../components/currency/currency';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {

  @ViewChild(CurrencyComponent) currency: CurrencyComponent;
  loading = false;
  viewBox = 'cable';
  activeMenu = 'Bills';
  packages = [
    { code: 'OP1', name: 'Option1' },
    { code: 'OP2', name: 'Option2' },
    { code: 'OP3', name: 'Option3)' }
  ];
  bouquets: any;
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
  balance: number;
  tvOptions: any;
  powerOptions: any;
  cable_package: any;
  cable_bouquet: any;
  bouquetObj: any;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider,
    private storage: Storage, private api: ApiProvider) {
    this.data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ngOnInit() {
    this.storage.get('balance').then(value => {
      this.balance = value;
    });
    this.api.jsonData().subscribe((res: any) => {
      this.tvOptions = res.TV;
      this.powerOptions = res.Electricity;
    });
  }

  cablePayment(val) {
    this.loading = true;
    console.log(val.value);
    if (this.bouquetObj) {
      const data = {
        Id: String(val.value.cable_package),
        smartcard: String(val.value.card_number),
        amount: String(this.bouquetObj.amount),
        phone: String(val.value.phone_number),
        name: String(this.bouquetObj.name),
        bundleCode: String(val.value.cable_bouquet)
      }

      this.api.tvPayment(data).subscribe((res: any) => {
        this.loading = false;
        console.log(res);
        val.reset();
        if (res.status === true) {
          console.log(res);
          this.showPopup('success', res.message);
        } else if (res.status === false) {
          val.reset();
          this.showPopup('failure', res.message);
        }
      }, err => {
        this.loading = false;
        console.log(err);
        if (err.error.status === false) {
          this.showPopup('failure', err.error.message);
        }
      });
    } else {
      this.loading = false;
      this.showPopup('info', 'Please select a TV package and bouquet to continue..')
    }
  }

  powerPayment(val) {
    this.loading = true;
    console.log(val.value);
    const data = {
      service_category_id: String(val.value.power_provider),
      meter: String(val.value.card_number),
      amount: String(val.value.amount),
      phone: String(val.value.phone_number)
    }

    this.api.powerPayment(data).subscribe((res: any) => {
      console.log(res);
      val.reset();
      this.loading = false;
      if (res.msg) {
        this.showPopup('info', res.msg);
      }
      if (res.status === true) {
        console.log(res);
        this.showPopup('success', res.message);
      } else if (res.status === false) {
        this.showPopup('failure', res.message);
      }
    }, err => {
      console.log(err);
      this.loading = false;
      if (err.status === 0) {
        this.showPopup('failure', "Error processing payment. Please try again..");
      }
      if (err.error.status === false) {
        val.reset();
        this.showPopup('failure', err.error.message);
      }
    });
  }

  showPopup(type, text) {
    this.popupText = {
      type: type,
      text: text
    };
    this.popup = true;
  }

  updatePackage(id) {
    this.tvOptions.map(options => {
      if (options.id === id) {
        this.bouquets = options.bundles;
      }
    });
  }

  updateBouquet(id) {
    this.bouquets.map(bouquet => {
      if (bouquet.bundleCode === id) {
        this.bouquetObj = bouquet;
      }
    });
  }

  changeView(opt) {
    this.viewBox = opt;
  }

  onSubmit(value) {
    console.log(value);
  }

  exitPopup() {
    this.popup = false;
  }

}
