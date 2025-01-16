import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'agreement-tracking',
    loadChildren: () => import('./agreement-tracking/agreement-tracking.module').then(m => m.AgreementTrackingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosedRoutingModule { }
