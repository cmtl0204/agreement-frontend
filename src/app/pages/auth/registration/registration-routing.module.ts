import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfessionalComponent} from "./professional/professional.component";
import {CompanyComponent} from "./company/company.component";
import {RegistrationComponent} from "./registration.component";
import {ExitGuard} from "@guards/exit.guard";


const routes: Routes = [
  {
    title: 'Registration',
    path: '',
    component: RegistrationComponent
  },
  {
    title: 'Professionals Registration',
    path: 'professionals',
    component: ProfessionalComponent
  },
  {
    title: 'Companies Registration',
    path: 'companies',
    component: CompanyComponent,
    canDeactivate: [ExitGuard]
  },
  {
    title: 'Companies Registration',
    path: 'companies/:id',
    component: CompanyComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
