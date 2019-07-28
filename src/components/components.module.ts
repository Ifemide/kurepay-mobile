import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuComponent } from './menu/menu';
import { CurrencyComponent } from './currency/currency';
import { LoaderComponent } from './loader/loader';

@NgModule({
	declarations: [MenuComponent,
    CurrencyComponent,
    LoaderComponent],
	imports: [IonicModule],
	exports: [MenuComponent,
    CurrencyComponent,
    LoaderComponent]
})

export class ComponentsModule { }
