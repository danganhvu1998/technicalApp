import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

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

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public http: HttpClient,
    public store: Storage) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async testing(){
    //let response = await this.http.post(url, DATA, options).toPromise()
    let headers = new HttpHeaders({ 'Content-Type': 'x-www-form-urlencoded' });
    let options = { headers: headers };
    let url = "http://localhost:8000/api/data";
    let data = { data : '502f13a6a4bd7bdd30b2d78dd0a05677c098233e' }
    let DATA = "data=whatever";
    let response = await this.http.post(url, DATA, options).toPromise();
    //console.log(response);
    //let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //let options = { headers: headers };
    //let response = await this.http.post(url, data, options).toPromise();
    //console.log('API Response : ', response);
    /*
      .toPromise().then((response) => {
        console.log('API Response : ', response);
      })
      .catch((error) => { 
        console.error('API Error : ', error.status);
      });
    */
  }

  async testing2(){
    let response = await this.http.get("http://localhost:8000/api/data").toPromise();
    console.log(response);
  }

  postAjax(){
    let DATA = "data=this_is_data_data";
    let url = "http://localhost:8000/api/data";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
      console.log("Current status:", xhr.readyState, xhr.status);
      if (xhr.readyState>3 && xhr.status==200) {
        console.log("result:",xhr.responseText);
      }
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(DATA);
    return xhr;
  }
}
