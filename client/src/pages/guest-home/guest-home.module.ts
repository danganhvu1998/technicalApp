import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestHomePage } from './guest-home';

@NgModule({
  declarations: [
    GuestHomePage,
  ],
  imports: [
    IonicPageModule.forChild(GuestHomePage),
  ],
})
export class GuestHomePageModule {}
