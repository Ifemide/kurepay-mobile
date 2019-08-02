import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public _api: ApiProvider) {
    this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenPage');
  }

  checkToken(data) {
    const formData = {
      "token": data.value.token_code
    }
    this._api.token(formData).subscribe((res: any) => {
      if (res.status === 'Ok') {
        this.goToPage('Dashboard');
      }
    }, err => {
      console.log(err.error);
      if (err.error.type) {
        this.notify = true;
        this.notifyText = err.error.msg;
        if (err.error.msg === "Invalid Token") {
          this.token = false;
          this.notifyText = err.error.msg;
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
      if (res.status === 'ok') {
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

}
