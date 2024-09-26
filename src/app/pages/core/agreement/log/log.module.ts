import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {LogRoutingModule} from './log-routing.module';
import {ButtonModule} from "primeng/button";
import {StepperModule} from "primeng/stepper";
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SharedModule} from "@shared/shared.module";
import {ToolbarModule} from "primeng/toolbar";
import {PanelModule} from "primeng/panel";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {MessageModule} from 'primeng/message';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PasswordModule} from 'primeng/password';
import {RippleModule} from 'primeng/ripple';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {TableModule} from "primeng/table";
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputSwitchModule} from "primeng/inputswitch";
import {TagModule} from "primeng/tag";
import {ListboxModule} from "primeng/listbox";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {CustomFormatDatePipe} from "@shared/pipes";
import {LogComponent} from "./log.component";
import {TimelineModule} from "primeng/timeline";

@NgModule({
  declarations: [
    LogComponent
  ],
  exports: [
    LogComponent
  ],
  imports: [
    CommonModule,
    LogRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    DropdownModule,
    NgOptimizedImage,
    MessageModule,
    PanelModule,
    AvatarModule,
    ToolbarModule,
    OverlayPanelModule,
    InputNumberModule,
    ToggleButtonModule,
    CalendarModule,
    RadioButtonModule,
    StepperModule,
    TabViewModule,
    FileUploadModule,
    InputTextareaModule,
    MultiSelectModule,
    FormsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    SelectButtonModule,
    InputSwitchModule,
    TagModule,
    ListboxModule,
    ConfirmPopupModule,
    TimelineModule
  ],
  providers: [CustomFormatDatePipe,
  ]
})
export class LogModule {
}
