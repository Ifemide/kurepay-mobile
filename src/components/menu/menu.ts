import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @Input() activeMenu: string;
  view = '';
  submenu = false;

  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferralPage');
    this.view = this.activeMenu;
    console.log(this.activeMenu);
  }

  showSubMenu() {
    this.submenu = !this.submenu;
  }

  goToPage(title) {
    this.navCtrl.setRoot(title + 'Page');
    this.view = title;
    console.log(this.view);
  }

  logout() {
    this.storage.clear();
    this.goToPage('Login');
  }

}
