import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from "@guards";
import {RoleEnum} from "@shared/enums";

const routes: Routes = [
  {
    path: 'agreements',
    loadChildren: () => import('./agreement/agreement.module').then(m => m.AgreementModule),
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.NATIONAL_SUPERVISOR, RoleEnum.INTERNATIONAL_SUPERVISOR]}
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.AGREEMENT_ADMINISTRATOR]}
  },
  {
    path: 'national-supervisor',
    loadChildren: () => import('./national-supervisor/national-supervisor.module').then(m => m.NationalSupervisorModule),
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.NATIONAL_SUPERVISOR]}
  },
  {
    path: 'international-supervisor',
    loadChildren: () => import('./international-supervisor/international-supervisor.module').then(m => m.InternationalSupervisorModule),
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.INTERNATIONAL_SUPERVISOR]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
