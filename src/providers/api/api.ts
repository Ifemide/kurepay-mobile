import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  url: any;

  constructor(public _http: HttpClient) {
    // console.log('Hello ApiProvider Provider');
    this.url = 'https://kurepay.herokuapp.com/api/';
  }

  login(data) {
    return this._http.post(this.url + 'users/login', data);
  }

  signup(data) {
    return this._http.post(this.url + 'users/signup', data);
  }

  token(data) {
    return this._http.post(this.url + 'users/verify', data);
  }

  resendToken(data) {
    return this._http.post(this.url + 'users/resend', data);
  }

}
