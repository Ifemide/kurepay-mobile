import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UtilitiesPage } from './utilities';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UtilitiesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UtilitiesPage),
  ],
})
export class UtilitiesPageModule { }
