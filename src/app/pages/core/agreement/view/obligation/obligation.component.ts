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
import { AgreementModel } from '@models/convenio/agreement.model';
import { ObligationTypeModel } from '@models/convenio/obligation-type.model';
import { ObligationModel } from '@models/convenio/obligation.model';
import { InstitutionObligationModel } from '@models/convenio/institution-obligation.model';

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.scss']
})
export class ObligationComponent implements OnInit, OnExitInterface {
  /** Services **/
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);

  /** Form **/
  @Input({ required: true }) id!: string;
  protected form!: FormGroup;

  /** Enums **/
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly CompanyRegistrationFormEnum = CompanyRegistrationFormEnum;
  private readonly routesService = inject(RoutesService);
  
  //validation
  isLoading:boolean=true;
  isContraparte: boolean=true;

  
  //datos desde modelos
  obligationType: ObligationTypeModel = {
    id: '1',
    typeId: 'Contraparte'
  };

  obligation: ObligationModel = {
    id: '1',
    modelId: 'model123',
    description: 'Descripción de la obligación'
  };

  institutionObligation: InstitutionObligationModel = {
    id: '1',
    obligationTypeId: 'type123',
    modelId: 'model456'
  };


  constructor( public messageDialogService:MessageDialogService) {
    this.buildForm();
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
  }

  ngOnInit(): void {
    this.setFormValues();
    //validation counter-part
    this.isLoading='MINTUR'!== this.obligationType.typeId;
    this.isContraparte='Contraparte' == this.obligationType.typeId;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      tradeName: [{ value: '', disabled: true }],
      obligation: [{ value: '', disabled: true }],
      counterparty: [{ value: '', disabled: true }]
    });
  }

  setFormValues() {
    this.form.patchValue({
      tradeName: 'Mi Empresa',
      obligation: 'Obligación MINTUR (Ir al campo obligación)',
      counterparty: 'Ejemplo de dato de contraparte'
    });
  }

  onSubmit(): void {
    // Lógica para manejar el envío del formulario
  }

  redirectRegistration() {
    this.routesService.registration();
  }

  /** Getters para los campos del formulario **/
  get tradeNameField(): AbstractControl {
    return this.form.controls['tradeName'];
  }

  get obligationField(): AbstractControl {
    return this.form.controls['obligation'];
  }

  get counterpartyField(): AbstractControl {
    return this.form.controls['counterparty'];
  }
}
