import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { ButtonModule } from "primeng/button";
import { StepperModule } from "primeng/stepper";
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from "../../../../shared/shared.module";
import { ToolbarModule } from "primeng/toolbar";
import { PanelModule } from "primeng/panel";
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { BasicDataComponent } from './basic-data/basic-data.component';
import { AppearerComponent } from './appearer/appearer.component';
import { AgreementDateComponent } from './agreement-date/agreement-date.component';
import { AgreementAdministratorComponent } from './agreement-administrator/agreement-administrator.component';
import { ObligationComponent } from './obligation/obligation.component';
import { FinancingComponent } from './financing/financing.component';
import { DocumentComponent } from './document/document.component';
import { AddendumComponent } from './addendum/addendum.component';
import { FileUploadModule } from 'primeng/fileupload';
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
    declarations: [
        RegisterComponent,
        Component1Component,
        Component2Component,
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
    InputTextareaModule
  ]
})
export class RegisterModule { }
