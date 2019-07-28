import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundPage } from './fund';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FundPage,
  ],
  imports: [
    IonicPageModule.forChild(FundPage),
    ComponentsModule
  ],
})
export class FundPageModule { }
