import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    imports: [
        FontAwesomeModule,
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        MenuComponent
    ],
    exports: [
        HeaderComponent,
        MenuComponent,
        FontAwesomeModule
    ]
})
export class CoreModule { }
