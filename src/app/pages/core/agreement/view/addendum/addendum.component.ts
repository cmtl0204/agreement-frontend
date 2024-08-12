import { Component, inject, Input, OnInit } from '@angular/core';
import { CoreService} from '@servicesApp/core';
import {AddendumEnum, AgreementFormEnum} from '@shared/enums';
import { AddendumModel } from '@models/core/addendum.model';
import { AgreementModel, ColumnModel } from '@models/core';

@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrl: './addendum.component.scss'
})
export class AddendumComponent{

  /** Services **/
  protected readonly coreService = inject(CoreService);


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
