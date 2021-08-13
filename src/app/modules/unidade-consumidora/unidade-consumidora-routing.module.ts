import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadeConsumidoraComponent } from './unidade-consumidora/unidade-consumidora.component';
import { UnidadesConsumidorasComponent } from './unidades-consumidoras/unidades-consumidoras.component';

const routes: Routes = [
    {
        path: '',
        component: UnidadesConsumidorasComponent
    },
    {
        path: 'unidade-consumidora',
        component: UnidadeConsumidoraComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnidadeConsumidoraRoutingModule { }