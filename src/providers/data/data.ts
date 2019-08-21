// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataProvider {

  private defaultCurrency = new BehaviorSubject('NGN');
  public choiceCurrency = this.defaultCurrency.asObservable();

  constructor() {
    console.log('Hello DataProvider Provider');
  }

  changeCurrency(curr: string) {
    this.defaultCurrency.next(curr);
  }

}
