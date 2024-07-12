import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';
import { BasicDataComponent } from './basic-data/basic-data.component';

const routes: Routes = [
  {
    path: '',
    component:ViewComponent
  },
  {
    path: 'agreement',
    component:BasicDataComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
