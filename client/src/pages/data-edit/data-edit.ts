import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InfoCenterProvider } from '../../providers/info-center/info-center';
import { DataProvider } from '../../providers/data/data';

import { GlobalPage } from '../global/global';

/**
 * Generated class for the DataEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-edit',
  templateUrl: 'data-edit.html',
})
export class DataEditPage {

  @ViewChild('data') userData;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public infoCenter: InfoCenterProvider,
    public data: DataProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataEditPage');
    console.log(this.infoCenter.dataEditId, this.infoCenter.dataEditData);
  }

  async dataEditer(){
  	if(this.userData.value.length==0) {
      this.infoCenter.presentAlert("Data can't be empty","","Oh sure!");
      return 0;
    }
    let data = {data: this.userData.value, id: this.infoCenter.dataEditId};
    //console.log(data);
    console.log(await this.data.dataEditer(data));
    this.infoCenter.presentAlert("Edited");
    this.navCtrl.setRoot(GlobalPage);
  }
}
