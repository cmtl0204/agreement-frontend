import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternationalSupervisorRoutingModule } from './international-supervisor-routing.module';
import { AgreementListComponent } from './agreement/agreement-list/agreement-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from '@shared/shared.module';
import {DialogModule} from "primeng/dialog";
import {ViewModule} from "../agreement/view/view.module";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";


@NgModule({
  declarations: [
    AgreementListComponent
  ],
  imports: [
    CommonModule,
    InternationalSupervisorRoutingModule,
    SharedModule,
    ToolbarModule,
    ButtonModule,
    PaginatorModule,
    TableModule,
    InputGroupModule,
    TagModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    ViewModule,
    InputGroupAddonModule
  ]
})
export class InternationalSupervisorModule { }