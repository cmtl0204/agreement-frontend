import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClosingProcessRoutingModule} from './closing-process-routing.module';
import {ClosingNotificationComponent} from './closing-notification/closing-notification.component';
import {PeriodTackingLogListComponent} from './period-tacking-log-list/period-tacking-log-list.component';
import {ClosingLogCurrentComponent} from "./closing-log-current/closing-log-current.component";
import {ClosingProcessComponent} from './closing-process.component';
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {DividerModule} from "primeng/divider";
import {SharedModule} from "@shared/shared.module";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {ClosingLogListComponent} from "./closing-log-list/closing-log-list.component";
import {TrackingLogListComponent} from "./tracking-log-list/tracking-log-list.component";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PanelModule} from "primeng/panel";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
    ClosingNotificationComponent,
    PeriodTackingLogListComponent,
    ClosingLogCurrentComponent,
    ClosingLogListComponent,
    TrackingLogListComponent,
    ClosingProcessComponent
  ],
    imports: [
        CommonModule,
        ClosingProcessRoutingModule,
        TableModule,
        ToolbarModule,
        Button,
        TooltipModule,
        DividerModule,
        SharedModule,
        DialogModule,
        FileUploadModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        PanelModule,
        ReactiveFormsModule,
        ConfirmDialogModule
    ]
})
export class ClosingProcessModule {
}
