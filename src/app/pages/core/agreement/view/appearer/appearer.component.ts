import { Component, inject, Input } from '@angular/core';
import { AgreementModel, ColumnModel } from '@models/core';
import { CoreService } from "@servicesApp/core";
import {
  ExternalInstitutionsFormEnum,
  InternalInstitutionsFormEnum
} from '@shared/enums';

@Component({
  selector: 'app-appearer',
  templateUrl: './appearer.component.html',
  styleUrls: ['./appearer.component.scss']
})
export class AppearerComponent {
  /** Services **/
  protected readonly coreService = inject(CoreService);

  /** Form **/
  @Input({required: true}) agreement!: AgreementModel;
  protected externalInstitutionsColumns: ColumnModel[] = [];
  protected internalInstitutionColumns: ColumnModel[] = [];

  constructor() {
    this.buildExternalInstitutionsColumns();
    this.buildInternalInstitutionsColumns();
  }

  /** build Columns**/
  buildInternalInstitutionsColumns() {
    this.internalInstitutionColumns = [
      {
        field: 'name', header: InternalInstitutionsFormEnum.name
      },
      {
        field: 'position', header: InternalInstitutionsFormEnum.position
      },
      {
        field: 'personType', header: InternalInstitutionsFormEnum.personType
      },
    ];
  }

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
}
