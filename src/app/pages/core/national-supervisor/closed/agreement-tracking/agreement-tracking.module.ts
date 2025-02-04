import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementTrackingRoutingModule } from './agreement-tracking-routing.module';
import { ClosingExecutionDocumentComponent } from './closing-execution-document/closing-execution-document.component';
import { ClosingNotificationComponent } from './closing-notification/closing-notification.component';
import { ClosingDocumentsComponent } from './closing-documents/closing-documents.component';
import { AgreementTrackingComponent } from './agreement-tracking.component';
import {Button} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {MessagesModule} from "primeng/messages";
import {SharedModule} from "@shared/shared.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PanelModule} from "primeng/panel";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {ToolbarModule} from "primeng/toolbar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {NationalSupervisorModule} from "../../national-supervisor.module";
import { SendDocumentComponent } from './send-document/send-document.component';
import {CheckboxModule} from "primeng/checkbox";


@NgModule({
    declarations: [
        ClosingExecutionDocumentComponent,
        ClosingNotificationComponent,
        ClosingDocumentsComponent,
        AgreementTrackingComponent,
        SendDocumentComponent
    ],
  exports: [
    ClosingNotificationComponent,
    ClosingExecutionDocumentComponent
  ],
    imports: [
        CommonModule,
        AgreementTrackingRoutingModule,
        Button,
        FormsModule,
        InputTextModule,
        PrimeTemplate,
        TableModule,
        DividerModule,
        DialogModule,
        FileUploadModule,
        MessagesModule,
        SharedModule,
        InputTextareaModule,
        ReactiveFormsModule,
        PanelModule,
        DropdownModule,
        CalendarModule,
        ToolbarModule,
        ConfirmDialogModule,
        NationalSupervisorModule,
        CheckboxModule
    ]
})
export class AgreementTrackingModule { }
