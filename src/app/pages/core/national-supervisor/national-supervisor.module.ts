import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementListComponent } from './agreement/agreement-list/agreement-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { SharedModule } from "@shared/shared.module";
import { TagModule } from 'primeng/tag';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NationalSupervisorRoutingModule } from './national-supervisor-routing.module';



@NgModule({
  declarations: [
    AgreementListComponent
  ],
  imports: [
    CommonModule,
    NationalSupervisorRoutingModule,
    SharedModule,
    ToolbarModule,
    ButtonModule,
    PaginatorModule,
    TableModule,
    InputGroupModule,
    TagModule,
    ReactiveFormsModule,
    InputTextModule,
  ]
})
export class NationalSupervisorModule { }
