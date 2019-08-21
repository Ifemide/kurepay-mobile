import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
// import { _throw } from 'rxjs/observable/throw';
// import { catchError, mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(private storage: Storage) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let promise = this.storage.get('auth_token');

    return Observable.fromPromise(promise)
      .mergeMap(token => {
        let clonedReq = this.addToken(request, token);
        return next.handle(clonedReq)
      });
  }

  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'x-auth-token': `${token}`
        }
      });
      return clone;
    }
    return request;
  }

}
