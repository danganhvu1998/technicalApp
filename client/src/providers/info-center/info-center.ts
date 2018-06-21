import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the InfoCenterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InfoCenterProvider {

  constructor(
  	public http: HttpClient,
    public alertCtrl: AlertController,	
    public storage: Storage,
  ) {
    console.log('Hello InfoCenterProvider Provider');
  }

  hostUrl = "http://localhost:8000/api/";
  userId = 0;
  userEmail = "";
  userName = "";
  guestId = 0;
  guestEmail = "";
  guestName = "";
  dataEditId = 0;
  dataEditData = "";

  public presentAlert(title, body = "", button="OK"){
  	let alert = this.alertCtrl.create({
      title: title,
      subTitle: body,
      buttons: [button]
    });
    alert.present();
  }

  public async getData(url){
    url = this.hostUrl+url;
  	return await this.http.get(url).toPromise();
  }

  public async postData(url, data){
    url = this.hostUrl+url;
  	let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
	  return await this.http.post(url, data, options).toPromise();
  }

}
