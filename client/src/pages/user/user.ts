import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthenProvider } from '../../providers/authen/authen';
import { InfoCenterProvider } from '../../providers/info-center/info-center';

import { LoginPage } from '../login/login';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

	@ViewChild('userName') userName;
  @ViewChild('userPass') userPass;
  @ViewChild('password') password;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authen:AuthenProvider,
    public infoCenter: InfoCenterProvider,
    public storage: Storage,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  saveInfo(response){
    if(response.result == 1){
      this.infoCenter.presentAlert("Changed!");
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.infoCenter.presentAlert(response.error);
    }
  }

  async changeInfo(){
  	console.log(this.userName.value, this.userPass.value, this.password.value);
    var userPass = this.userPass.value;
    if(this.userPass.value==''){
      userPass = this.password.value;
    }
    let data = {
      id: this.infoCenter.userId,
      password: this.password.value,
      userName: this.userName.value,
      userPass: userPass
    }
    let response = await this.authen.changeInfo(data);
    this.saveInfo(response);
  }
}