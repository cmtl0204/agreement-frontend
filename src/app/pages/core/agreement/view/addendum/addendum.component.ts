import { Component, inject, Input } from '@angular/core';
import { AgreementModel, ColumnModel } from '@models/core';
import { CoreService } from '@servicesApp/core';
import { AddendumEnum, AgreementFormEnum, AgreementSectionFormEnum } from '@shared/enums';

@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrl: './addendum.component.scss'
})
export class AddendumComponent{

  /** Services **/
  protected readonly coreService = inject(CoreService);
  protected readonly AgreementSectionFormEnum = AgreementSectionFormEnum;


  /** Form **/
  @Input({required: true}) agreement!: AgreementModel;
  protected addendumColumns: ColumnModel[]=[];

  /** build Columns**/
  constructor() {
    this.buildaddendumColumns();
  }

  buildaddendumColumns() {
    this.addendumColumns = [
      {
        field: 'isAddendum', header: AgreementFormEnum.isAddendum
      },
      {
        field: 'description', header: AddendumEnum.description
      },
      {
        field: 'document', header: AddendumEnum.file
      },
    ];
  }
}
