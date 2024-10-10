import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgreementAdministratorRoutingModule} from './agreement-administrator-routing.module';
import {AgreementListComponent} from './agreement/agreement-list/agreement-list.component';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {InputGroupModule} from 'primeng/inputgroup';
import {SharedModule} from "@shared/shared.module";
import {TagModule} from 'primeng/tag';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from "primeng/dialog";
import {ViewModule} from "../agreement/view/view.module";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {PeriodListComponent} from "./agreement/period-list/period-list.component";
import {TrackingLogListComponent} from "./agreement/tracking-log-list/tracking-log-list.component";
import {FileUploadModule} from "primeng/fileupload";
import {MessagesModule} from "primeng/messages";
import {DividerModule} from "primeng/divider";
import {AdditionalDocumentListComponent} from "./agreement/additional-document-list/additional-document-list.component";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextareaModule} from "primeng/inputtextarea";


@NgModule({
  declarations: [
    AgreementListComponent,
    PeriodListComponent,
    TrackingLogListComponent,
    AdditionalDocumentListComponent
  ],
    imports: [
        CommonModule,
        AgreementAdministratorRoutingModule,
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
        MessagesModule,
        DividerModule,
        ConfirmDialogModule,
        InputTextareaModule,
    ],
})
export class AgreementAdministratorModule {
}
