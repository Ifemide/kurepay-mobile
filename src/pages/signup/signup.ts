import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  notify = false;
  notifyText = '';
  popup = false;
  popupText = {
    type: '',
    text: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public _api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(data) {
    console.log(data.value);
    const formData = {
      "firstname": data.value.first_name,
      "lastname": data.value.last_name,
      "phone": "0" + String(data.value.phone_number),
      "email": data.value.email_address,
      "password": data.value.password,
      "confirmpassword": data.value.password2
    }
    this._api.signup(formData).subscribe((res: any) => {
      console.log(res);
      if (res.status === true) {
        this.navCtrl.setRoot('TokenPage', {
          email: data.value.email_address
        });
      } else if (res.status === false) {
        this.notify = true;
        this.notifyText = res.message;
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
