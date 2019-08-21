import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MenuComponent } from './menu/menu';
import { CurrencyComponent } from './currency/currency';
import { PopupComponent } from './popup/popup';

@NgModule({
    declarations: [MenuComponent,
        CurrencyComponent,
        PopupComponent],
    imports: [IonicModule],
    exports: [MenuComponent,
        CurrencyComponent,
        PopupComponent]
})

export class ComponentsModule { }
