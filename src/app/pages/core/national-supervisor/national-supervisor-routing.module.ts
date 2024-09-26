import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgreementListComponent } from './agreement/agreement-list/agreement-list.component';
import {AgreementLogListComponent} from "./agreement/agreement-log-list/agreement-log-list.component";

const routes: Routes = [
  {
    path: 'agreement-list',
    component: AgreementListComponent
  },
  {
    path: 'agreement-log-list',
    component: AgreementLogListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalSupervisorRoutingModule { }
