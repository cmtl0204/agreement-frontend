import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementRoutingModule } from './agreement-routing.module';
import { ReportComponent } from './report/report.component';
import {PanelModule} from "primeng/panel";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
import {Button} from "primeng/button";


@NgModule({
  declarations: [

    ReportComponent
  ],
  imports: [
    CommonModule,
    AgreementRoutingModule,
    PanelModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    Button
  ]
})
export class AgreementModule { }
