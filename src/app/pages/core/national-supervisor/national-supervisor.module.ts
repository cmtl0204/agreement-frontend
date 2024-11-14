import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementListComponent } from './agreement-list/agreement-list.component';
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
import {DialogModule} from "primeng/dialog";
import {ViewModule} from "../agreement/view/view.module";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {PeriodListComponent} from "./period-list/period-list.component";
import {TrackingLogListComponent} from "./tracking-log-list/tracking-log-list.component";
import {FileUploadModule} from "primeng/fileupload";
import {DividerModule} from "primeng/divider";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AdditionalDocumentListComponent} from "./additional-document-list/additional-document-list.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PeriodClosingListComponent} from "./period-closing-list/period-closing-list.component";
import {AgreementTerminationListComponent} from "./agreement-termination-list/agreement-termination-list.component";
import {PanelModule} from "primeng/panel";
import {CalendarModule} from "primeng/calendar";

@NgModule({
  declarations: [
    AgreementListComponent,
    PeriodListComponent,
    TrackingLogListComponent,
    AdditionalDocumentListComponent,
    AgreementTerminationListComponent,
    PeriodClosingListComponent
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
    DialogModule,
    ViewModule,
    IconFieldModule,
    InputIconModule,
    FileUploadModule,
    DividerModule,
    InputTextareaModule,
    ConfirmDialogModule,
    PanelModule,
    CalendarModule
  ]
})
export class NationalSupervisorModule { }
