import { Component, inject, Input, OnInit } from '@angular/core';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import {
  SkeletonEnum, 
  ExternalInstitutionsFormEnum,
  InternalInstitutionsFormEnum
} from '@shared/enums';
import { InternalInstitutionModel } from '@models/core/internal-institution.model';
import { ExternalInstitutionModel } from '@models/core/external-institution.model';
import { PrimeIcons,MessageService } from 'primeng/api';
import { CatalogueModel, ColumnModel } from '@models/core';

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
  protected columns: ColumnModel[] = [];
  protected externalInstitutionsColumns: ColumnModel[] = [];
  protected internalInstitutionColumns: ColumnModel[] = [];

  /** Foreign Keys **/
  protected internalPersonTypes: CatalogueModel[] = [];
  protected externalPersonTypes: CatalogueModel[] = [];
  protected positions: CatalogueModel[] = [];
  /** Enums **/
  protected readonly ExternalInstitutionsFormEnum = ExternalInstitutionsFormEnum;
  protected readonly InternalInstitutionsFormEnum = InternalInstitutionsFormEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;

  constructor(private messageService: MessageService) {
    this.buildExternalInstitutionsColumns();
    this.buildInternalInstitutionsColumns();

  }

  /** Data del internal**/
  buildInternalInstitutionsColumns() {
    this.internalInstitutionColumns = [
      {
        field: 'name', header: InternalInstitutionsFormEnum.name
      },
      {
        field: 'unit', header: InternalInstitutionsFormEnum.unit
      },
      {
        field: 'position', header: InternalInstitutionsFormEnum.position
      },
      {
        field: 'personType', header: InternalInstitutionsFormEnum.personType
      },
    ];
  }

  internalInstitution: InternalInstitutionModel[] = [
    {
      id: '1',
      name: 'Algo',
      positionId: 'Ministro',
      unit: 'Entidad Pública',
      agreementId: '1',
      personTypeId: '1',
    },
  ];
  // Data del external
  buildExternalInstitutionsColumns() {
    this.externalInstitutionsColumns = [
      {
        field: 'name', header: ExternalInstitutionsFormEnum.name
      },
      {
        field: 'position', header: ExternalInstitutionsFormEnum.position
      },
      {
        field: 'unit', header: ExternalInstitutionsFormEnum.unit
      },
      {
        field: 'personType', header: ExternalInstitutionsFormEnum.personType
      },
    ];
  }

  externalInstitution: ExternalInstitutionModel[] = [
    {
      id: '1',
      name: 'Algo2',
      position: 'Posicion',
      unit: 'Entidad Pública',
      agreementId: '1',
      personTypeId: '1',
    },
  ];
  ngOnInit(): void { }
  findAgrement() {

  }
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
