import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InfoCenterProvider } from '../../providers/info-center/info-center';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(
  	public http: HttpClient,
  	public infoCenter: InfoCenterProvider,
  ) {
    console.log('Hello DataProvider Provider');
  }

  public async dataPoster(data){
  	var url='data';
    data.userId = this.infoCenter.userId;
    data.token = this.infoCenter.token;
    console.log(data);
  	return await this.infoCenter.postData(url, data);
  }

  public async dataTaker(id=0){
  	let url='data/';
  	if(id>0){
  		url+=id.toString();
  	}
  	return await this.infoCenter.getData(url);
  }

  public async dataEditer(data){
    var url='data/edit';
    data.userId = this.infoCenter.userId;
    data.token = this.infoCenter.token;
    console.log(data);
    return await this.infoCenter.postData(url, data);
  }

}
