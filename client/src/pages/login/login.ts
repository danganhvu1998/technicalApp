import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthenProvider } from '../../providers/authen/authen';
import { InfoCenterProvider } from '../../providers/info-center/info-center';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  @ViewChild('loginUsername') loginUsername;
  @ViewChild('loginPassword') loginPassword;
  @ViewChild('regisUsername') regisUsername;
  @ViewChild('regisPassword') regisPassword;
  @ViewChild('regisRePassword') regisRePassword;

  autoUsername = "danganhvu1998@gmail.com";
  autoPassword = "davdav";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authen:AuthenProvider,
    public infoCenter: InfoCenterProvider,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //********************************** LOGIN ONLY **********************************\\
  async login(){
    var email = this.loginUsername.value;
    var password = this.loginPassword.value;
    if( !this.validateEmail(email) ){
      this.infoCenter.presentAlert('Email invalid');
    } else {
      var data = { email: email, password : password };
      this.loginUserInform(await this.authen.login('api/users/login', data));
    }
  }

  loginUserInform(response){
    if(response.result==0){
      this.infoCenter.presentAlert(response.error);
    } else {
      console.log("navCtrl activate");
    }
  }

  //********************************** REGISTER ONLY **********************************\\
  async register(){
    var email = this.regisUsername.value;
    var password = this.regisPassword.value;
    if(password!= this.regisRePassword.value){
      this.infoCenter.presentAlert('Password is different')
      return 0;
    }
    if( !this.validateEmail(email) ){
      this.infoCenter.presentAlert('Email invalid');
    } else {
      var data = { email: email, password : password };
      this.registerUserInform(await this.authen.register('api/users/register', data));
    }
  }

  registerUserInform(response){
    if(response.result==0){
      this.infoCenter.presentAlert(response.error);
    } else {
      this.infoCenter.presentAlert("Register Successfully", "Please login to continue", "Cool!");
      this.autoUsername = this.regisUsername.value;
      this.autoPassword = this.regisPassword.value;
    }
  }
}
