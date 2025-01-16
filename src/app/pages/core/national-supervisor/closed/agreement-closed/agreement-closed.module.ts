import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementClosedRoutingModule } from './agreement-closed-routing.module';
import { AgreementClosedComponent } from './agreement-closed.component';


@NgModule({
  declarations: [
    AgreementClosedComponent
  ],
  imports: [
    CommonModule,
    AgreementClosedRoutingModule
  ]
})
export class AgreementClosedModule { }
