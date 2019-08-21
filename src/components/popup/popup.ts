import { Component, Input } from '@angular/core';

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

  constructor() {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
  }

}
