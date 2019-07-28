import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferPage } from './transfer';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TransferPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferPage),
    ComponentsModule
  ],
})
export class TransferPageModule { }
