import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  activeMenu = 'Profile';
  viewBox = 'profile';
  firstName: string;
  lastName: string;
  email: string;
  loading = false;
  localCurrency: string;
  balance: number;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };
  otp = false;
  refCode: any;
  selectCode = false;
  choiceCurrency: string;
  countries: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider,
    public storage: Storage, private api: ApiProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ngOnInit() {
    this.storage.get('email').then(value => {
      this.email = value
    });
    this.storage.get('first_name').then(value => {
      this.firstName = value
    });
    this.storage.get('last_name').then(value => {
      this.lastName = value
    });
    this.storage.get('balance').then(value => {
      this.balance = value;
    });
    this.api.changeCurrencyJSON().subscribe(res => {
      console.log(res);
      this.countries = res;
    });
    this._data.choiceCurrency.subscribe(res => {
      this.choiceCurrency = res;
    });
  }

  chooseCountry(val) {
    console.log(val.currency_code);
    this._data.changeCurrency(val.currency_code);
    this.showCountries();
  }

  showCountries() {
    this.selectCode = !this.selectCode;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  onSubmit(foo) {
    this.showPopup('info', 'Please contact the admin to update your profile');
  }

  kyCustomer(bvn) {
    console.log(bvn.value);
    console.log(this.refCode);
    if (this.refCode === undefined) {
      this.loading = true;
      const data = {
        number: bvn.value.bvn
      }

      this.api.sendBVN(data).subscribe((res: any) => {
        this.loading = false;
        console.log(res);
        if (res.status === true) {
          this.showPopup('success', res.message);
          this.otp = true;
          this.refCode = res.data.referenceCode;
        } else if (res.status === false) {
          this.showPopup('failure', res.message);
        }
      }, err => {
        this.loading = false;
        if (err.error.status === false) this.showPopup('failure', err.error.message);
      });
    } else {
      this.loading = true;
      const data = {
        "number": bvn.value.phone_number,
        "otp": bvn.value.otp_bvn
      }
      this.api.verifyBVN(this.refCode, data).subscribe((res: any) => {
        console.log(res);
        this.otp = false;
        this.loading = false;
        bvn.reset();
        if (res.status === true) {
          this.showPopup('success', res.message);
        } else if (res.status === false) {
          this.showPopup('failure', res.message);
        }
      }, err => {
        bvn.reset();
        this.loading = false;
        if (err.error.status === false) this.showPopup('failure', err.error.message);
      });
    }
  }

  changeView(opt) {
    this.viewBox = opt;
  }

  updatePassword(val) {
    this.loading = true;
    console.log(val.value.re_new_pass)
    console.log(val.value.new_pass)
    if (val.value.re_new_pass === undefined || val.value.new_pass === undefined || val.value.curr_password === undefined) {
      this.loading = false;
      val.reset();
      this.showPopup('info', 'Please fill in all the fields to change password');
    } else if (val.value.new_pass === val.value.re_new_pass) {
      const data = {
        oldPassword: val.value.curr_password,
        newPassword: val.value.new_pass
      }

      this.api.updateUserPassword(data).subscribe((res: any) => {
        this.loading = false;
        this.showPopup('success', res.message);
        console.log(res);
      });
    } else {
      this.loading = false;
      val.reset();
      this.showPopup('failure', 'New passwords do not match, please try again!');
    }
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
