import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgreementListComponent} from './agreement/agreement-list/agreement-list.component';
import {PeriodListComponent} from "./agreement/period-list/period-list.component";
import {
  TrackingLogListComponent
} from "./agreement/tracking-log-list/tracking-log-list.component";

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
    path: 'tracking-log-list',
    component: TrackingLogListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalSupervisorRoutingModule {
}
