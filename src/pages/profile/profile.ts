import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  activeMenu = 'Profile';
  viewBox = 'profile';
  firstName = 'Yebba';
  lastName = 'Knight';
  email = 'yebba.knight@gmail.com';
  loader = false;
  localCurrency: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider) {
    this._data.choiceCurrency.subscribe(res => {
      this.localCurrency = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  onSubmit(value) {
    console.log(value);
  }

  changeView(opt) {
    this.viewBox = opt;
  }

  checkNewPassword(val) {
    console.log(val.value.re_new_pass)
    console.log(val.value.new_pass)
    if (val.value.new_pass === val.value.re_new_pass) {
      this.onSubmit(val.value);
    } else {
      val.reset();
      return 'New passwords do not match';
    }
  }

}
