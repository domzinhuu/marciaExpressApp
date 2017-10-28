import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { Component, Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
@Injectable()
export class MyApp {
  rootPage: any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authProvider: AuthProvider) {
    platform.ready().then(() => {
       this.authProvider.isAuthenticated().subscribe(result => {
        if (result.valid) {
          this.rootPage = HomePage
        } else {
          this.rootPage = LoginPage
        }
      }, error => {
        this.rootPage = LoginPage
      }, () => {
        statusBar.styleDefault();
        splashScreen.hide();
      })

    });
  }
}

