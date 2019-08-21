import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the UtilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-utilities',
  templateUrl: 'utilities.html',
})
export class UtilitiesPage {

  activeMenu = 'Utilities';
  viewBox = 'sms';
  loading = false;
  popup = false;
  popupText = {
    type: '',
    text: ''
  };
  smsRoutes: any;
  waecObj: any;
  sms_text = '';
  pinAmount = 600;
  totalAmount = 0;
  scratch_pins: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilitiesPage');
  }

  ngOnInit() {
    this.api.jsonData().subscribe((res: any) => {
      this.smsRoutes = res.SMS;
      this.waecObj = res.Education[0];
    });
  }

  sendSMS(val) {
    this.loading = true;
    console.log(val.value);
    const data = {
      Id: val.value.sms_route,
      recipents: val.value.phone_number,
      message: val.value.sms_text
    }

    this.api.sendSMS(data).subscribe((res: any) => {
      if (res.status === true) {
        this.loading = false;
        val.reset();
        this.showPopup('success', res.message);
      } else if (res.status === false) {
        this.loading = false;
        val.reset();
        this.showPopup('failure', res.message);
      }
    }, err => {
      console.log(err.error);
      if (err.error.status === false) {
        this.loading = false;
        this.showPopup('failure', err.error.message);
      }
    });
  }

  calcAmount(val) {
    if (val.length) {
      let num = Number(val);
      if (num > 0) {
        this.totalAmount = this.pinAmount * num;
      } else {
        this.showPopup('info', 'Please enter a valid number!');
        this.scratch_pins = '';
      }
    }
  }

  buyWAEC(val) {
    this.loading = true;
    if (val.value.scratch_pins) {
      console.log(val.value);
      const data = {
        service_category_id: String(this.waecObj.id),
        pins: String(val.value.scratch_pins),
        amount: String(this.totalAmount)
      }
      console.log(data);

      this.api.buyWaecPins(data).subscribe((res: any) => {
        this.loading = false;
        console.log(res);
        if (res.status === true) {
          val.reset();
          this.showPopup('success', res.message);
        } else if (res.status === false) {
          val.reset();
          this.showPopup('failure', res.msg ? res.msg : res.data.message);
        }
      }, err => {
        val.reset();
        this.loading = false;
        console.log(err);
      });
    } else {
      this.loading = false;
      this.showPopup('info', 'Please enter a number!');
      this.scratch_pins = '';
    }
  }

  changeView(opt) {
    this.viewBox = opt;
    this.loading = false;
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
