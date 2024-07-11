import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';
import { PartObligationComponent } from './part-obligation/part-obligation.component';
import { FinancingComponent } from './financing/financing.component';
import { ExitGuard } from '@guards/exit.guard';

const routes: Routes = [
  {
    path: '',
    component:ViewComponent
  },
  {
    title: 'Obligaciones de las partes',
    path: 'part-obligation',
    component: PartObligationComponent,
    canDeactivate: [ExitGuard]
  },
  {
    title: 'Financiamiento',
    path: 'financing',
    component: FinancingComponent,
    canDeactivate: [ExitGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
