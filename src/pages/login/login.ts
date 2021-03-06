import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  notify = false;
  notifyText = '';
  loading = false;
  reset = false;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _api: ApiProvider, private storage: Storage, private _data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(data) {
    this.loading = true;
    const formData = {
      "email": data.value.email_address,
      "password": data.value.password
    }
    this._api.login(formData).subscribe((res: any) => {
      console.log(res);
      if (res.token) {
        data.reset();
        this.loading = false;
        this._data.changeCurrency(res.localCurrency);
        this.storage.set('auth_token', res.token);
        this.storage.set('email', res.email);
        this.storage.set('first_name', res.firstname);
        this.storage.set('last_name', res.lastname);
        this.storage.set('balance', res.balance);
        this.storage.set('isLoggedIn', true);
        this.goToPage('Dashboard');
      }
    }, err => {
      this.loading = false;
      console.log(err.error);
      if (err.status === 0 && err.ok === false) {
        console.log(err);
        this.showPopup('failure', 'Please check your internet settings and try again!');
      }
      if (err.error.status === false) {
        this.notify = true;
        this.notifyText = err.error.message;
        if (err.error.message === 'Your account has not been verified.') {
          this.navCtrl.setRoot('TokenPage', {
            email: data.value.email_address
          });
        }
        data.reset();
      }
    });
  }

  showResetPassword() {
    this.reset = !this.reset;
  }

  resetPassword(password) {
    this.loading = true;
    const data = {
      email: password.value.email_address
    }
    this._api.validEmail(data).subscribe((res: any) => {
      if (res.status === true) {
        console.log(password.value);
        const data = {
          email: password.value.email_address
        };

        this._api.resetPassword(data).subscribe((res: any) => {
          this.loading = false;
          if (res.status === false || res.status === true) {
            this.showPopup('success', res.message);
            this.showResetPassword();
          }
        }, err => {
          this.loading = false;
          console.log(err);
          if (!err.error.status) this.showPopup('failure', err.error.message)
        });
      }
    }, err => {
      this.loading = false;
      console.log(err);
      if (!err.error.status) this.showPopup('failure', err.error.message)
    });
  }

  closeNotify() {
    this.notify = !this.notify;
  }

  goToPage(title) {
    this.navCtrl.setRoot(title + 'Page');
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
