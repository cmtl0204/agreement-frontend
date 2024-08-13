import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register.component";
import {RoleGuard} from "@guards";
import {RoleEnum} from "@shared/enums";

const routes: Routes = [
  {
    path: '', component: RegisterComponent,
    canActivate: [RoleGuard],
    data: {roles: [RoleEnum.NATIONAL_SUPERVISOR, RoleEnum.INTERNATIONAL_SUPERVISOR]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
