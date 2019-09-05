import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup',
  templateUrl: 'popup.html'
})
export class PopupComponent {

  @Input() popup: any;
  popupText: any;

  constructor(private navCtrl: NavController, private storage: Storage) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
  }

  goToLogin() {
    this.storage.clear();
    this.navCtrl.setRoot('LoginPage');
  }

}
