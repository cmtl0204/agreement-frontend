import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then(m => m.UpdateModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementRoutingModule {
}
