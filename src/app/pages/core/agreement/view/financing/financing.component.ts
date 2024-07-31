import { Component, inject, Input, OnInit } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { OnExitInterface } from "@shared/interfaces";
import { CoreService, MessageDialogService} from "@servicesApp/core";
import { CompanyRegistrationFormEnum, SkeletonEnum } from "@shared/enums";
import { AgreementModel, FinancingModel } from '@models/core';

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.scss']
})
export class FinancingComponent implements OnInit, OnExitInterface {
  /** Services **/
  protected readonly coreService = inject(CoreService);
  
  /** Form **/
  @Input() id!: string;


  /** Enums **/
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly CompanyRegistrationFormEnum = CompanyRegistrationFormEnum;

  agreements: AgreementModel[] = [];

  financings: FinancingModel[] = [];

  constructor(public messageDialogService: MessageDialogService) {
    
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
  }

  ngOnInit(): void {
    this.findAgreementsFinancing();
    this.findFinancing();
  }

  findFinancing(){
    this.financings = [
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
    ]
  }
  
  findAgreementsFinancing(){
    this.agreements = [
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
  }

  }
