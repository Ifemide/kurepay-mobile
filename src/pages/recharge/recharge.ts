import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage implements OnInit {

  activeMenu = 'Recharge';
  viewBox = 'airtime';
  loading = false;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };
  localCurrency: string;
  balance: number;
  airtimeOptions: any;
  dataOptions: any;
  bundles: any;
  data_provider: any;
  data_plan: any;
  planAmount: any;

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
    this.api.jsonData().subscribe((res: any) => {
      console.log(res);
      this.airtimeOptions = res.Airtime;
      this.dataOptions = res.Data;
    });
    if (this.navParams.data.tab) {
      this.viewBox = this.navParams.data.tab;
    }
  }

  buyAirtime(val) {
    if (val.value.airtime_amount !== undefined &&
      val.value.network_provider !== undefined &&
      val.value.phone_number !== undefined) {
      this.loading = true;
      console.log(val.value);
      const data = {
        amount: String(val.value.airtime_amount),
        id: String(val.value.network_provider),
        phone: String(val.value.phone_number)
      }

      this.api.buyAirtime(data).subscribe((res: any) => {
        console.log(res);
        this.loading = false;
        val.reset();
        if (res.status === true) {
          this.showPopup('success', res.message);
        } else if (res.status === false) {
          val.reset();
          this.showPopup('failure', res.message);
        }
      }, err => {
        console.log(err);
        this.loading = false;
        if (err.error.status === false) {
          val.reset();
          this.showPopup('failure', err.error.message);
        }
      });
    } else {
      this.showPopup('info', 'Please enter all values to continue!')
    }

  }

  buyData(val) {
    this.loading = true;
    const data = {
      amount: String(this.planAmount),
      service_category_id: String(val.value.data_provider),
      phone: val.value.phone_or_account_no,
      bundleCode: String(val.value.data_plan)
    }

    console.log(data);

    this.api.buyData(data).subscribe((res: any) => {
      console.log(res);
      val.reset();
      this.loading = false;
      if (res.status === true) {
        this.showPopup('success', res.message);
      } else if (res.status === false) {
        this.showPopup('failure', res.message);
      }
    }, err => {
      console.log(err);
      this.loading = false;
      val.reset();
      if (err.error.status === false) {
        this.showPopup('failure', err.error.message);
      }
      if (err.status === 400 || err.status === 0) {
        this.showPopup('failure', err.statusText);
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

  updateBundle(id) {
    console.log(id);
    this.dataOptions.map(options => {
      if (options.id === id) {
        this.bundles = options.bundles
      }
    });
  }

  updatePlan(code) {
    this.bundles.map(bundle => {
      if (bundle.bundleCode === code) {
        this.planAmount = bundle.amount;
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
