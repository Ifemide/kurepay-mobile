import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-token',
  templateUrl: 'token.html',
})
export class TokenPage {

  token = true;
  notify = false;
  notifyText = '';
  email: String;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public _api: ApiProvider,
    private storage: Storage) {
    this.email = this.navParams.get('email');
    console.log(this.email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenPage');
  }

  checkToken(data) {
    const formData = {
      "token": data.value.token_code
    }
    this._api.token(formData).subscribe((res: any) => {
      console.log(res);
      if (res.token) {
        // this.loading = false;
        this.storage.set('auth_token', res.token);
        this.storage.set('email', res.email);
        this.storage.set('first_name', res.firstname);
        this.storage.set('last_name', res.lastname);
        this.storage.set('balance', res.balance);
        this.goToPage('Fund');
      }
    }, err => {
      console.log(err.error);
      if (err.error.status === false) {
        this.notify = true;
        this.notifyText = err.error.message;
        if (err.error.message === "Invalid Token") {
          this.token = false;
          this.notifyText = err.error.message;
          this.notifyText += '. Click to resend token to your email address';
        }
        data.reset();
      }
    });
  }

  sendToken(data) {
    const formData = {
      "email": this.email
    }
    this._api.resendToken(formData).subscribe((res: any) => {
      if (res.status === true) {
        this.token = true;
      }
    }, err => {
      console.log(err.error);
      if (err.error.status === false) {
        this.notify = true;
        this.notifyText = err.error.message;
        data.reset();
      }
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
