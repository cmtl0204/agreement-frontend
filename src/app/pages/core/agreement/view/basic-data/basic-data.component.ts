import { Component, inject, Input, OnInit } from '@angular/core';
import { AgreementStateModel } from '@models/core';
import { AgreementModel } from '@models/core/agreement.model';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AgreementFormEnum, SkeletonEnum } from '@shared/enums';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss'
})
export class BasicDataComponent implements OnInit {

  /** Services **/
  protected readonly coreService = inject(CoreService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);

  /** Form **/

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  /** Model */
  protected agreement: AgreementModel = {
    number: '2024-001',
    name: 'Convenio de Colaboración Tecnológica',
    internalNumber: 100,
    origin: {
      name: 'Universidad Nacional'
    },
    type: {
      name: 'Marco, Específico, Comodato o préstamo de uso'
    },
    specialType: {
      name: 'Memorando de Entendimiento'
    },
    objective: 'Fomentar la investigación y desarrollo tecnológico entre las instituciones participantes.'
  }

  protected agreementState: AgreementStateModel = {
    state: {
      name: 'Convenio vigente'
    },
    id: '',
    agreementId: '',
    registeredAt: new Date(''),
    stateId: '',
    userId: ''
  }

  constructor() { }

  ngOnInit(): void {
    // findAgreement();
  }

  findAgrement() {

  }

  /** Redirects **/
  redirectRegistration() {
    // this.messageDialogService.questionOnExit().subscribe(result => {
    //   if (result) {
    //     this.onLeave = true;
    //     this.routesService.registration();
    //   } else {
    //     this.onLeave = false;
    //   }
    // });

    this.routesService.registration();
  }

}
