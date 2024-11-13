import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgreementListComponent } from './agreement-list/agreement-list.component';
import {TrackingLogListComponent} from "./tracking-log-list/tracking-log-list.component";
import {PeriodListComponent} from "./period-list/period-list.component";
import {AgreementTerminationListComponent} from "./agreement-termination-list/agreement-termination-list.component";

const routes: Routes = [
  {
    path: 'agreement-list',
    component: AgreementListComponent
  },
  {
    path: 'period-list/:agreementId',
    component: PeriodListComponent
  },
  {
    path: 'agreement-termination-list/:agreementId',
    component: AgreementTerminationListComponent
  },
  {
    path: 'tracking-log-list',
    component: TrackingLogListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementAdministratorRoutingModule { }
