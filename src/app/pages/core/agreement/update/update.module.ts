import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { UpdateComponent } from './update.component';
import { AgreementDateComponent } from './agreement-date/agreement-date.component';
import { AppearerComponent } from './appearer/appearer.component';
import { BasicDataComponent } from './basic-data/basic-data.component';
import { DocumentComponent } from './document/document.component';
import { FinancingComponent } from './financing/financing.component';
import { ObligationComponent } from './obligation/obligation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../../shared/shared.module";
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [
        UpdateComponent,
        AgreementDateComponent,
        BasicDataComponent,
        AppearerComponent,
        AgreementDateComponent,
        ObligationComponent,
        FinancingComponent,
        DocumentComponent,
    ],
    exports: [
        AgreementDateComponent
    ],
    imports: [
        CommonModule,
        UpdateRoutingModule,
        ReactiveFormsModule,
        FormsModule,
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
        FileUploadModule,
        TableModule,
        InputTextareaModule,
        MultiSelectModule,
        DialogModule,
        MultiSelectModule,
        DialogModule,
        ListboxModule,
        ConfirmDialogModule
    ]
})
export class UpdateModule { }
