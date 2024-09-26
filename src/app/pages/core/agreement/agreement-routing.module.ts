import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./update/update.module').then(m => m.UpdateModule),
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./view/view.module').then(m => m.ViewModule),
  },
  {
    path: 'log/:id',
    loadChildren: () => import('./log/log.module').then(m => m.LogModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementRoutingModule {
}
