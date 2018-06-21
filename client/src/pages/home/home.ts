import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InfoCenterProvider } from '../../providers/info-center/info-center';
import { DataProvider } from '../../providers/data/data';

import { DataEditPage } from '../data-edit/data-edit';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

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
    console.log('ionViewDidLoad HomePage');
    this.dataTaker();
  }
  //******************************** DataTaker ********************************\\
  assignFunc(response){
    this.dataArray = response.data;
  }

  async dataTaker(){
    this.assignFunc(await this.data.dataTaker(this.infoCenter.userId));
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
    }
  }

  dataUserEdit(id, data){
    console.log(id);
    this.infoCenter.dataEditId = id;
    this.infoCenter.dataEditData = data;
    this.navCtrl.push(DataEditPage) ;
  }
}
