import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from "@guards";
import {RoleEnum} from "@shared/enums";
import {LogComponent} from "./log.component";

const routes: Routes = [
  {
    path: '',
    component: LogComponent,
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.NATIONAL_SUPERVISOR, RoleEnum.INTERNATIONAL_SUPERVISOR]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule {
}
