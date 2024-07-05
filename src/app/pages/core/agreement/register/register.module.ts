import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import {ButtonModule} from "primeng/button";
import {StepperModule} from "primeng/stepper";


@NgModule({
  declarations: [
    RegisterComponent,
    Component1Component,
    Component2Component
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ButtonModule,
    StepperModule
  ]
})
export class RegisterModule { }
