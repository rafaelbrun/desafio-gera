import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'unidades-consumidora',
    pathMatch: 'full'
  },
  { path: 'faturas', loadChildren: () => import('./modules/fatura/fatura.module').then(m => m.FaturaModule) },
  {
    path: 'unidades-consumidora', loadChildren: () => import('./modules/unidade-consumidora/unidade-consumidora.module')
      .then(m => m.UnidadeConsumidoraModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
