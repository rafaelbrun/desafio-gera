import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadeConsumidoraComponent } from './unidade-consumidora/unidade-consumidora.component';
import { UnidadesConsumidoraComponent } from './unidades-consumidora/unidades-consumidora.component';

const routes: Routes = [
    {
        path: '',
        component: UnidadesConsumidoraComponent
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