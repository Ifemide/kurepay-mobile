import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReferralPage } from './referral';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReferralPage,
  ],
  imports: [
    IonicPageModule.forChild(ReferralPage),
    ComponentsModule
  ],
})
export class ReferralPageModule { }
