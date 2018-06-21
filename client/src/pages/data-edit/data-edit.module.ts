import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataEditPage } from './data-edit';

@NgModule({
  declarations: [
    DataEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DataEditPage),
  ],
})
export class DataEditPageModule {}
