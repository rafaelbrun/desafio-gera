import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaturasComponent } from './faturas/faturas.component';
import { FaturaComponent } from './fatura/fatura.component';
import { FaturaRoutingModule } from './fatura-routing.module';



@NgModule({
  declarations: [
    FaturaComponent,
    FaturasComponent
  ],
  imports: [
    CommonModule,
    FaturaRoutingModule
  ]
})
export class FaturaModule { }
