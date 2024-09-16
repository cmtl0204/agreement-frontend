import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
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
import {BasicDataComponent} from './basic-data/basic-data.component';
import {AppearerComponent} from './appearer/appearer.component';
import {AgreementDateComponent} from './agreement-date/agreement-date.component';
import {AgreementAdministratorComponent} from './agreement-administrator/agreement-administrator.component';
import {ObligationComponent} from './obligation/obligation.component';
import {FinancingComponent} from './financing/financing.component';
import {DocumentComponent} from './document/document.component';
import {AddendumComponent} from './addendum/addendum.component';
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

@NgModule({
  declarations: [
    RegisterComponent,
    AgreementDateComponent,
    BasicDataComponent,
    AppearerComponent,
    AgreementDateComponent,
    AgreementAdministratorComponent,
    ObligationComponent,
    FinancingComponent,
    DocumentComponent,
    AddendumComponent,
  ],
  exports: [
    ObligationComponent
  ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
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
        ConfirmPopupModule
    ],
  providers: [CustomFormatDatePipe,
  ]
})
export class RegisterModule {
}
