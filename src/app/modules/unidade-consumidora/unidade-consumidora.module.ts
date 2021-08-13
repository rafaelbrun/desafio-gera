import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeConsumidoraComponent } from './unidade-consumidora/unidade-consumidora.component';
import { UnidadeConsumidoraRoutingModule } from './unidade-consumidora-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnidadesConsumidorasComponent } from './unidades-consumidoras/unidades-consumidoras.component';



@NgModule({
  declarations: [
    UnidadeConsumidoraComponent,
    UnidadesConsumidorasComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    UnidadeConsumidoraRoutingModule
  ]
})
export class UnidadeConsumidoraModule { }
