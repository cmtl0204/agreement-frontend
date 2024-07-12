import { Component, inject, Input, OnInit } from '@angular/core';
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
  @Input({ required: true }) id!: string;

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  /** Model */
  protected agreement: AgreementModel = {
    id: '',
    number: '1200',
    internalNumber: 100,
    name: 'Convenio 01',
    originId: 'origen',
    typeId: 'tipo',
    isFinishDate: false,
    endedReason: '',
    yearTerm: 2024,
    monthTerm: 10,
    dayTerm: 31,
    objective: '',
    isFinancing: false,
    userId: '',
    subscribedAt: new Date(),
    startedAt: new Date(),
    endedAt: null
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
