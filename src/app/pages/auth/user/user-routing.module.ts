import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserFormComponent} from './user-form/user-form.component';
import {ExitGuard} from '@guards';
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: ':id',
    component: UserFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
