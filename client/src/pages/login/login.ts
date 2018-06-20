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
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    let url = "http://localhost:8000/api/data";
    let data = { info : "Nothing" };
    let response = await this.http.post(url, data, options).toPromise();
    console.log(response);
  }

  async testing2(){
    let response = await this.http.get("http://localhost:8000/api/data").toPromise();
    console.log(response);
  }

  async testing3(){
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = { headers: headers };
    let url = "http://localhost:8000/api/data";
    let data = "info=Nothing";
    let response = await this.http.post(url, data, options).toPromise();
    console.log(response);
  }

  postAjax(){
    let DATA = "info=this_is_data_data";
    let url = "http://localhost:8000/api/data";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) {
        console.log(JSON.parse(xhr.responseText));
      }
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(DATA);
    return xhr;
  }
}
