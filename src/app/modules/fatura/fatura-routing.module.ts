import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaturaComponent } from './fatura/fatura.component';
import { FaturasComponent } from './faturas/faturas.component';

const routes: Routes = [
    {
        path: '',
        component: FaturasComponent
    },
    {
        path: 'fatura',
        component: FaturaComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FaturaRoutingModule { }