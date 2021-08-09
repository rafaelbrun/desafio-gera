import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesConsumidoraComponent } from './unidades-consumidora/unidades-consumidora.component';
import { UnidadeConsumidoraComponent } from './unidade-consumidora/unidade-consumidora.component';
import { UnidadeConsumidoraRoutingModule } from './unidade-consumidora-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [
    UnidadeConsumidoraComponent,
    UnidadesConsumidoraComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    UnidadeConsumidoraRoutingModule
  ]
})
export class UnidadeConsumidoraModule { }
