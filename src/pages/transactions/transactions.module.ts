import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsPage } from './transactions';
import { ComponentsModule } from '../../components/components.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    TransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionsPage),
    ComponentsModule,
    DatePickerModule
  ],
})
export class TransactionsPageModule { }
