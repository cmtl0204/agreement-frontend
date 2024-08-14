import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent, MainComponent} from "@layout";
import {RoleGuard, TokenGuard} from "@guards";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [TokenGuard],
    children: [
      {
        path: 'admin',
        title: 'Admin',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'core',
        title: 'Core',
        loadChildren: () => import('./pages/core/core.module').then(m => m.CoreModule),
      },
    ]
  },

  {
    path: 'auth',
    title: 'Auth',
    component: BlankComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'common',
    title: 'Common',
    component: BlankComponent,
    loadChildren: () => import('./pages/common/common.module').then(m => m.CommonModule),
  },
  {
    path: 'login',
    title: 'Login',
    redirectTo: '/auth/authentication/login'
  },
  {
    path: 'password-reset',
    title: 'Password Reset',
    redirectTo: '/auth/authentication/password-reset'
  },
  {
    path: 'profile',
    title: 'Profile',
    redirectTo: '/admin/users/profile'
  },
  {
    path: '**',
    redirectTo: '/common/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
