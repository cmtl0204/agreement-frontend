import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { BasicDataComponent } from './basic-data/basic-data.component';
import { SharedModule } from '@shared/shared.module';
import { AddendumComponent } from './addendum/addendum.component';
import { AgreementAdministratorComponent } from './agreement-administrator/agreement-administrator.component';
import { AppearerComponent } from './appearer/appearer.component';
import { AgreementDateComponent } from "./agreement-date/agreement-date.component";
import { FinancingComponent } from './financing/financing.component';
import { ObligationComponent } from './obligation/obligation.component';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DocumentComponent } from './document/document.component';


@NgModule({
    declarations: [
        ViewComponent,
        BasicDataComponent,
        AgreementDateComponent,
        AppearerComponent,
        ObligationComponent,
        FinancingComponent,
        AddendumComponent,
        AgreementAdministratorComponent,
        DocumentComponent
    ],
    exports: [
        ViewComponent,
        ObligationComponent
    ],
    imports: [
        CommonModule,
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
        ViewRoutingModule,
        TableModule,
        TagModule,
        ToastModule,
        FormsModule,
        InputNumberModule,
        ToggleButtonModule,
        CalendarModule,
        RadioButtonModule,
        StepperModule,
        FileUploadModule,
        InputTextareaModule,
        ButtonModule,
        TagModule
    ]
})
export class ViewModule {
}
