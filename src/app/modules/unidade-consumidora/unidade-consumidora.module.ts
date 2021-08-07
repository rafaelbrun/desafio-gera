import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesConsumidoraComponent } from './unidades-consumidora/unidades-consumidora.component';
import { UnidadeConsumidoraComponent } from './unidade-consumidora/unidade-consumidora.component';
import { UnidadeConsumidoraRoutingModule } from './unidade-consumidora-routing.module';



@NgModule({
  declarations: [
    UnidadeConsumidoraComponent,
    UnidadesConsumidoraComponent
  ],
  imports: [
    CommonModule,
    UnidadeConsumidoraRoutingModule
  ]
})
export class UnidadeConsumidoraModule { }
