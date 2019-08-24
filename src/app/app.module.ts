import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';
import { ApiProvider } from '../providers/api/api';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorProvider } from '../providers/interceptor/interceptor';

import { QRCodeModule } from 'angularx-qrcode';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    QRCodeModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    ApiProvider,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    InAppBrowser
  ]
})
export class AppModule { }
