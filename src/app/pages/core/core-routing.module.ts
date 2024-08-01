import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'agreements',
    loadChildren: () => import('./agreement/agreement.module').then(m => m.AgreementModule),
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
  },
  {
    path: 'national-supervisor',
    loadChildren: () => import('./national-supervisor/national-supervisor.module').then(m => m.NationalSupervisorModule),
  },
  {
    path: 'international-supervisor',
    loadChildren: () => import('./international-supervisor/international-supervisor.module').then(m => m.InternationalSupervisorModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
