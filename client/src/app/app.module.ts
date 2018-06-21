import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from '../pages/login/login'
import { GlobalPage } from '../pages/global/global';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { LogoutPage } from '../pages/logout/logout';
import { GuestHomePage } from '../pages/guest-home/guest-home';
import { DataEditPage } from '../pages/data-edit/data-edit';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenProvider } from '../providers/authen/authen';
import { InfoCenterProvider } from '../providers/info-center/info-center';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UserPage,
    HomePage,
    GlobalPage,
    LogoutPage,
    GuestHomePage,
    DataEditPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    LoginPage,
    UserPage,
    HomePage,
    GlobalPage,
    LogoutPage,
    GuestHomePage,
    DataEditPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenProvider,
    InfoCenterProvider,
    DataProvider
  ]
})
export class AppModule {}
