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

  public async login(url, data){
  	return await this.infoCenter.postData(url, data);
  }

  public async register(url, data){
    return await this.infoCenter.postData(url, data);
  }


}
