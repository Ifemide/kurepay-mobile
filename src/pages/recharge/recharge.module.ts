import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechargePage } from './recharge';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RechargePage,
  ],
  imports: [
    IonicPageModule.forChild(RechargePage),
    ComponentsModule
  ],
})
export class RechargePageModule { }
