import { HistoryPageModule } from '../pages/history/history.module';
import { CustomErrorHandler } from './app.error-handler';
import { HttpClientModule } from '@angular/common/http';
import { AboutPageModule } from './../pages/about/about.module';
import { LoginPageModule } from './../pages/login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage} from '../pages/details/details';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HttpClientModule,
    AboutPageModule,
    HistoryPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__medb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    DataProvider,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ]
})
export class AppModule { }
