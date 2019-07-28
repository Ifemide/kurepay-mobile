import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillsPage } from './bills';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BillsPage,
  ],
  imports: [
    IonicPageModule.forChild(BillsPage),
    ComponentsModule
  ],
})
export class BillsPageModule { }
