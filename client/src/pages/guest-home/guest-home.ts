import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InfoCenterProvider } from '../../providers/info-center/info-center';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the GuestHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-home',
  templateUrl: 'guest-home.html',
})
export class GuestHomePage {
  dataArray = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public infoCenter: InfoCenterProvider,
    public data: DataProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.dataTaker();
  }
  //******************************** DataTaker ********************************\\
  assignFunc(response){
    this.dataArray = response.data;
  }

  async dataTaker(){
    this.assignFunc(await this.data.dataTaker(this.infoCenter.guestId));
  }


  dataUserInfo(id, guestName){
    console.log(id, guestName);
    this.infoCenter.guestId = id;
    this.infoCenter.guestName = guestName;
    this.navCtrl.pop();
    this.navCtrl.push(GuestHomePage);
  }
}
