import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InfoCenterProvider } from '../../providers/info-center/info-center';
import { DataProvider } from '../../providers/data/data';

import { HomePage } from '../home/home';
import { GuestHomePage } from '../guest-home/guest-home';
import { DataEditPage } from '../data-edit/data-edit';

/**
 * Generated class for the GlobalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-global',
  templateUrl: 'global.html',
})
export class GlobalPage {

	@ViewChild('data') userData;
  dataArray = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public infoCenter: InfoCenterProvider,
    public data: DataProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlobalPage');
    this.dataTaker();
  }
  //******************************** DataTaker ********************************\\
  async dataTaker(){
    let response = (await this.data.dataTaker());
    console.log(response);
    this.dataArray = response.data;
  }

  //******************************** DataPoster ********************************\\
  dataPosterUserInform(response){
    if(response.result == true){
      this.infoCenter.presentAlert("Posted");
      this.dataTaker();
    }
  }

  async dataPoster(){
    if(this.userData.value.length==0) {
      this.infoCenter.presentAlert("Data can't be empty","","Oh sure!");
      return 0;
    }
    let data = {data: this.userData.value, userId: this.infoCenter.userId};
    this.dataPosterUserInform(await this.data.dataPoster(data));
  }

  //******************************** DataController ********************************\\
  dataUserInfo(id, guestName){
    console.log(id, guestName);
    if(id == this.infoCenter.userId){
      this.navCtrl.setRoot(HomePage);
    } else {
      this.infoCenter.guestId = id;
      this.infoCenter.guestName = guestName;
      this.navCtrl.push(GuestHomePage);
    }
  }

  dataUserEdit(id, data){
    console.log(id);
    this.infoCenter.dataEditId = id;
    this.infoCenter.dataEditData = data;
    this.navCtrl.push(DataEditPage) ;
  }
}
