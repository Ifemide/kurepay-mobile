// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  private defaultCurrency = new BehaviorSubject('NGN');
  choiceCurrency = this.defaultCurrency.asObservable();

  constructor() {
    console.log('Hello DataProvider Provider');
  }

  changeCurrency(curr: string) {
    this.defaultCurrency.next(curr);
  }

}
