import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { PrimeIcons } from "primeng/api";

import { OnExitInterface } from "@shared/interfaces";
import { CatalogueModel } from "@models/core";
import { AuthHttpService, AuthService } from "@servicesApp/auth";
import { CoreService, MessageDialogService, RoutesService } from "@servicesApp/core";
import { CataloguesHttpService } from "@servicesHttp/core";
import { CatalogueTypeEnum, CompanyRegistrationFormEnum, RoutesEnum, SkeletonEnum } from "@shared/enums";
import { Financing } from '@models/convenio/financing.model';
import { Agreement } from '@models/convenio/agreement.model';

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.scss']
})
export class FinancingComponent implements OnInit, OnExitInterface {
  /** Services **/
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly routesService = inject(RoutesService);

  /** Form **/
  @Input() id!: string;
  protected form!: FormGroup;

  /** Enums **/
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly CompanyRegistrationFormEnum = CompanyRegistrationFormEnum;

  //validation
 
  
  agreement: Agreement = {
    id: '1',
    number: 'A001',
    internalNumber: 123,
    name: 'Acuerdo de financiamiento',
    originId: 'origin123',
    typeId: 'type456',
    subscribedAt: '2024-07-05T10:00:00Z',  // Aquí deberías usar un formato de fecha adecuado
    startedAt: '2024-07-05T10:00:00Z',      // Aquí deberías usar un formato de fecha adecuado
    isFinishDate: false,
    endedAt: '2024-12-31T23:59:59Z',       // Aquí deberías usar un formato de fecha adecuado
    endedReason: 'Terminación del acuerdo',
    yearTerm: 2,
    monthTerm: 6,
    dayTerm: 0,
    objective: 'Objetivo del acuerdo',
    isFinancing: true, //validacion
    closeTypeId: 'closeType789',
    closedAt: '2025-01-01T00:00:00Z',       // Aquí deberías usar un formato de fecha adecuado
    closeDetail: 'Detalle del cierre',
    closed: true
  };
  
  
  financing: Financing = {
    id: '1',
    modelId: 'model-1',
    budget: 50000,
    paymentMethod: 'Transferencia bancaria',
    source: 'Fondo de desarrollo',
    agreementId: 'agreement-1',
    agreement: this.agreement 
  };



  constructor(public messageDialogService: MessageDialogService) {
    this.buildForm();
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
  }

  ngOnInit(): void {
    //this.setFormValues();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      financing: [{ value: '', disabled: true }],
      appearing: [{ value: '', disabled: true }],
      budget_and_financing: [{ value: '', disabled: true }],
      payment_method: [{ value: '', disabled: true }],
      financing_source: [{ value: '', disabled: true }]
    });
  }

  setFormValues() {
    
  }

  onSubmit(): void {
    // Lógica para manejar el envío del formulario
  }

  redirectRegistration() {
    this.routesService.registration();
  }

  /** Getters para los campos del formulario **/
  get financingField(): AbstractControl {
    return this.form.controls['financing'];
  }

  get appearingField(): AbstractControl {
    return this.form.controls['appearing'];
  }

  get budget_and_financingField(): AbstractControl {
    return this.form.controls['budget_and_financing'];
  }

  get payment_methodField(): AbstractControl {
    return this.form.controls['payment_method'];
  }

  get financing_sourceField(): AbstractControl {
    return this.form.controls['financing_source'];
  }
}
