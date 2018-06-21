import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { InfoCenterProvider } from '../info-center/info-center';


/*
  Generated class for the AuthenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenProvider {

  constructor(
  	public http: HttpClient,
  	public storage: Storage,
    public infoCenter: InfoCenterProvider,
  	) {
    console.log('Hello AuthenProvider Provider');
  }

  public async login(data){
    var url = 'api/users/login';
  	return await this.infoCenter.postData(url, data);
  }

  public async register(data){
    var url = 'api/users/register';
    return await this.infoCenter.postData(url, data);
  }

  public async tokenCheck(data){
    var url = 'api/users/token';
    return await this.infoCenter.postData(url, data);
  }


}
