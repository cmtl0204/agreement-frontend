import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { FinancingComponent } from './financing/financing.component';
import { ObligationComponent } from './obligation/obligation.component';
import { RegistrationRoutingModule } from 'src/app/pages/auth/registration/registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ViewComponent, ObligationComponent, FinancingComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
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
    TableModule
  ]
})
export class ViewModule { }
