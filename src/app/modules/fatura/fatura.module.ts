import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaturasComponent } from './faturas/faturas.component';
import { FaturaComponent } from './fatura/fatura.component';
import { FaturaRoutingModule } from './fatura-routing.module';
import { CoreModule } from '@app/core/core.module';
import { ComponentsModule } from '@app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FaturaComponent,
    FaturasComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FaturaRoutingModule
  ]
})
export class FaturaModule { }
