import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './update.component';
import { ObligationComponent } from './obligation/obligation.component';
import { ExitGuard } from '@guards';

const routes: Routes = [
  {
    path:'',
    component:UpdateComponent
  },

  {
    title: 'Obligaciones de las partes',
    path: 'part-obligation',
    component: ObligationComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRoutingModule { }


