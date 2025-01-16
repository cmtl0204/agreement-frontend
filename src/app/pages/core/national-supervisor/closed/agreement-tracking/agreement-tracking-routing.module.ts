import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgreementTrackingComponent} from "./agreement-tracking.component";


const routes: Routes = [
  {
    path: ':agreementId',
    component: AgreementTrackingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementTrackingRoutingModule { }
