// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataProvider {

  private defaultCurrency = new BehaviorSubject('');
  public choiceCurrency = this.defaultCurrency.asObservable();

  private bgMode = new BehaviorSubject(false);
  public currBGMode = this.bgMode.asObservable();

  constructor() {
    console.log('Hello DataProvider Provider');
  }

  changeBGMode(mode: boolean) {
    this.bgMode.next(mode);
  }

  changeCurrency(curr: string) {
    this.defaultCurrency.next(curr);
  }

}
