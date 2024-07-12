import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';
import { BasicDataComponent } from './basic-data/basic-data.component';
import { ObligationComponent } from './obligation/obligation.component';
import { FinancingComponent } from './financing/financing.component';
import { ExitGuard } from '@guards/exit.guard';

const routes: Routes = [
  {
    path: '',
    component:ViewComponent
  },
  {
    path: 'agreement',
    component:BasicDataComponent
  },
  {
    title: 'Obligaciones de las partes',
    path: 'obligation',
    component: ObligationComponent,
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
