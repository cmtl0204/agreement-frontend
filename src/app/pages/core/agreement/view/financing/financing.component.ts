import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { OnExitInterface } from "@shared/interfaces";
import { CoreService, MessageDialogService, RoutesService } from "@servicesApp/core";
import { CompanyRegistrationFormEnum,SkeletonEnum } from "@shared/enums";
import { AgreementModel, FinancingModel } from '@models/core';

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

  agreements: AgreementModel[] = [
    {
      id: '1',
      number: 'A001',
      internalNumber: 123,
      name: 'Acuerdo de financiamiento 1',
      originId: 'origin123',
      typeId: 'type456',
      subscribedAt: new Date(),
      startedAt: new Date(),
      isFinishDate: false,
      endedAt: new Date(),
      endedReason: 'Terminación del acuerdo',
      yearTerm: 2,
      monthTerm: 6,
      dayTerm: 0,
      objective: 'Objetivo del acuerdo 1',
      isFinancing: true,
      userId: 'userr',
      externalInstitutions: [],
      internalInstitutions: []
    },
    {
      id: '2',
      number: 'A002',
      internalNumber: 124,
      name: 'Acuerdo de financiamiento 2',
      originId: 'origin124',
      typeId: 'type457',
      subscribedAt: new Date(),
      startedAt: new Date(),
      isFinishDate: false,
      endedAt: new Date(),
      endedReason: 'Terminación del acuerdo',
      yearTerm: 1,
      monthTerm: 8,
      dayTerm: 0,
      objective: 'Objetivo del acuerdo 2',
      isFinancing: true,
      userId: 'userr',
      externalInstitutions: [],
      internalInstitutions: []
    },
    {
      id: '3',
      number: 'A003',
      internalNumber: 125,
      name: 'Acuerdo de financiamiento 3',
      originId: 'origin125',
      typeId: 'type458',
      subscribedAt: new Date(),
      startedAt: new Date(),
      isFinishDate: false,
      endedAt: new Date(),
      endedReason: 'Terminación del acuerdo',
      yearTerm: 1,
      monthTerm: 4,
      dayTerm: 0,
      objective: 'Objetivo del acuerdo 3',
      isFinancing: true,
      userId: 'userr',
      externalInstitutions: [],
      internalInstitutions: []
    },
    {
      id: '4',
      number: 'A004',
      internalNumber: 126,
      name: 'Acuerdo de financiamiento 4',
      originId: 'origin126',
      typeId: 'type459',
      subscribedAt: new Date(),
      startedAt: new Date(),
      isFinishDate: false,
      endedAt: new Date(),
      endedReason: 'Terminación del acuerdo',
      yearTerm: 1,
      monthTerm: 2,
      dayTerm: 0,
      objective: 'Objetivo del acuerdo 4',
      isFinancing: true,
      userId: 'userr',
      externalInstitutions: [],
      internalInstitutions: []
    },
    {
      id: '5',
      number: 'A005',
      internalNumber: 127,
      name: 'Acuerdo de financiamiento 5',
      originId: 'origin127',
      typeId: 'type460',
      subscribedAt: new Date(),
      startedAt: new Date(),
      isFinishDate: false,
      endedAt: new Date(),
      endedReason: 'Terminación del acuerdo',
      yearTerm: 1,
      monthTerm: 1,
      dayTerm: 0,
      objective: 'Objetivo del acuerdo 5',
      isFinancing: true,
      userId: 'userr',
      externalInstitutions: [],
      internalInstitutions: []
    }
  ];

  financings: FinancingModel[] = [
    {
      id: '1',
      modelId: 'model-1',
      budget: 50000,
      paymentMethod: 'Transferencia bancaria',
      source: 'Fondo de desarrollo',
      agreement: this.agreements[0]
    },
    {
      id: '2',
      modelId: 'model-2',
      budget: 60000,
      paymentMethod: 'Cheque',
      source: 'Fondo de inversión',
      agreementId: this.agreements[1].id,
      agreement: this.agreements[1]
    },
    {
      id: '3',
      modelId: 'model-3',
      budget: 70000,
      paymentMethod: 'Efectivo',
      source: 'Subvención estatal',
      agreementId: this.agreements[2].id,
      agreement: this.agreements[2]
    },
    {
      id: '4',
      modelId: 'model-4',
      budget: 80000,
      paymentMethod: 'Crédito',
      source: 'Donación privada',
      agreementId: this.agreements[3].id,
      agreement: this.agreements[3]
    },
    {
      id: '5',
      modelId: 'model-5',
      budget: 90000,
      paymentMethod: 'Tarjeta de crédito',
      source: 'Fondo internacional',
      agreementId: this.agreements[4].id,
      agreement: this.agreements[4]
    }
  ];

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
