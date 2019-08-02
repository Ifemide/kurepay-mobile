import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  notify = false;
  notifyText = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public _api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(data) {
    const formData = {
      "email": data.value.email_address,
      "password": data.value.password
    }
    this._api.login(formData).subscribe((res: any) => {
      console.log(res);
      if (res.email) {
        this.goToPage('Dashboard');
      }
    }, err => {
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
