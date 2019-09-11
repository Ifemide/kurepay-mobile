import { Component } from '@angular/core';
import { Platform, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { DataProvider } from '../providers/data/data';
// import { LoginPage } from '../pages/login/locgin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = "LoginPage"
  loggedIn: boolean;
  public alertShown: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage,
    alertCtrl: AlertController, backgroundMode: BackgroundMode, data: DataProvider, app: App) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#f5f5f5');
      if (backgroundMode.isActive()) {
        data.changeBGMode(true);
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      storage.get('isLoggedIn').then((isLoggedIn) => {
        this.loggedIn = isLoggedIn;
        if (this.loggedIn === true) {
          // console.log('Be Happy!');
          this.rootPage = "DashboardPage";
        } else if (this.loggedIn === false) {
          this.rootPage = "LoginPage";
        }
      });
      platform.registerBackButtonAction(() => {
        if (this.alertShown == false) {
          let alert = alertCtrl.create({
            title: 'Confirm Exit',
            message: 'Are you sure you want to exit KurePay?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  this.alertShown = false;
                }
              },
              {
                text: 'Yes',
                handler: () => {
                  console.log('Yes clicked');
                  platform.exitApp();
                }
              }
            ]
          });
          alert.present().then(() => {
            this.alertShown = true;
          });
        }
      }, 0);
    });
    this.initInterval();
    // if (this.isTimeout) {
    //   console.log('Session Timed Out');
    //   this.rootPage = "LoginPage";
    //   // app.getActiveNav().setRoot(LoginPage)
    // }
  }

  lastAction = Date.now();
  MINUTES_UNITL_AUTO_LOGOUT = 1;
  CHECK_INTERVAL = 1000;
  now: any;
  timeleft: any;
  diff: any;
  isTimeout: any;
  interval: any;

  initListener() {
    console.log('New Session Started');
    this.reset();
  }

  initInterval() {
    this.interval = setInterval(() => {
      this.check();
    }, this.CHECK_INTERVAL);
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() {
    this.now = Date.now();
    this.timeleft = this.lastAction + (this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000);
    this.diff = this.timeleft - this.now;
    this.isTimeout = this.diff < 0;

    if (this.isTimeout) {
      console.log('Session Timed Out');
      this.rootPage = "LoginPage";
      clearInterval(this.interval);
    }
  }

}

