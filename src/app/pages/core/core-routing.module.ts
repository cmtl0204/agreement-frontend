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
    path: 'agreement-administrator',
    loadChildren: () => import('./agreement-administrator/agreement-administrator.module').then(m => m.AgreementAdministratorModule),
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
    loadChildren: () => import('./national-supervisor/national-supervisor.module').then(m => m.NationalSupervisorModule),
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.INTERNATIONAL_SUPERVISOR]}
  },
  {
    path: 'national-manager',
    loadChildren: () => import('./national-manager/national-manager.module').then(m => m.NationalManagerModule),
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.NATIONAL_MANAGER]}
  },
  {
    path: 'international-manager',
    loadChildren: () => import('./national-manager/national-manager.module').then(m => m.NationalManagerModule),
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.INTERNATIONAL_MANAGER]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
