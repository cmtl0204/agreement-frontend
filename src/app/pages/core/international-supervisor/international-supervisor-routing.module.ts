import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgreementListComponent } from './agreement/agreement-list/agreement-list.component';

const routes: Routes = [
  {
    path: 'agreement-list',
    component: AgreementListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternationalSupervisorRoutingModule { }
