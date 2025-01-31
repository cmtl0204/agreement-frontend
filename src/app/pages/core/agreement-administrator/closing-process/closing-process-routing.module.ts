import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClosingProcessComponent} from "./closing-process.component";

const routes: Routes = [
  {
    path: 'a/:agreementId',
    component: ClosingProcessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosingProcessRoutingModule {
}
