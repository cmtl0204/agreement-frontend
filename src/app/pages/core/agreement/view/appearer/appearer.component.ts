import { Component, inject, Input, OnInit } from '@angular/core';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AddendumEnum, SkeletonEnum } from '@shared/enums';
import { InternalInstitutionModel } from '@models/core/internal-institution.model';
import { ExternalInstitutionModel } from '@models/core/external-institution.model';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-appearer',
  templateUrl: './appearer.component.html',
  styleUrls: ['./appearer.component.scss']
})
export class AppearerComponent implements OnInit {

  /** Services **/
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly routesService = inject(RoutesService);
  public readonly messageDialogService = inject(MessageDialogService);


  /** Form **/
  @Input({ required: true }) id!: string;

  /** Enums **/
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;


  /** Data **/
  internalInstitution: InternalInstitutionModel[] = [
    {
      id: '1',
      name: 'Algo',
      positionId: 'Ministro',
      unit: 'Entidad Pública',
      agreementId: 'Algo',
      personTypeId: 'Algo',
    },
  ];

  externalInstitution: ExternalInstitutionModel[] = [
    {
      id: '1',
      name: 'Algo',
      position: 'Algo',
      unit: 'personas naturales privadas',
      agreementId: 'Algo',
      personTypeId: 'Algo',
    },
  ];
  constructor() { }
  ngOnInit(): void { }

  /** Form Builder & Validates **/

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
