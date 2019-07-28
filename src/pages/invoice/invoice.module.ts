import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicePage } from './invoice';
import { ComponentsModule } from '../../components/components.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    InvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicePage),
    ComponentsModule,
    DatePickerModule
  ],
})
export class InvoicePageModule { }
