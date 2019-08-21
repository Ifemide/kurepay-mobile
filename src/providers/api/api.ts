import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  private url: any;
  private utilityJSON: any;
  private banksJSON: any;

  constructor(public _http: HttpClient) {
    // console.log('Hello ApiProvider Provider');
    this.url = 'https://kurepay.herokuapp.com/api/';
    this.utilityJSON = 'assets/utility.json';
    this.banksJSON = 'assets/banks.json';
  }

  jsonData() {
    return this._http.get(this.utilityJSON);
  }

  bankDataJSON() {
    return this._http.get(this.banksJSON);
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

  generateToken() {
    return this._http.get(this.url + 'transfer/token');
  }

  sendBVN(data) {
    return this._http.post(this.url + 'users/bvn', data);
  }

  verifyBVN(id, data) {
    return this._http.post(`${this.url}users/verifybvn?ref=${id}`, data);
  }

  generateAddresses(data) {
    return this._http.post(this.url + 'fundwallet/generateAddress', data);
  }

  fundWithCard(data) {
    return this._http.post(this.url + 'fundWallet/credit_card', data);
  }

  getAccountName(data) {
    return this._http.post(this.url + 'transfer/resolve', data);
  }

  transferToBank(data) {
    return this._http.post(this.url + 'transfer/bank', data);
  }

  transferToCrypto(data) {
    return this._http.post(this.url + 'transfer/crypto', data);
  }

  transferToWallet(data) {
    return this._http.post(this.url + 'transfer/wallet', data);
  }

  buyAirtime(data) {
    return this._http.post(this.url + 'utilities/airtime', data);
  }

  buyData(data) {
    return this._http.post(this.url + 'utilities/data', data);
  }

  tvPayment(data) {
    return this._http.post(this.url + 'utilities/tv', data);
  }

  powerPayment(data) {
    return this._http.post(this.url + 'utilities/electricity', data);
  }

  sendSMS(data) {
    return this._http.post(this.url + 'utilities/sms', data);
  }

  buyWaecPins(data) {
    return this._http.post(this.url + 'utilities/waec', data);
  }

  updateUserPassword(data) {
    return this._http.patch(this.url + 'users/update', data);
  }

  allTransactions() {
    return this._http.get(this.url + 'transactions');
  }

}
