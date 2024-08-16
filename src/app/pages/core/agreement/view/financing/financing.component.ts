import {Component, inject, Input} from '@angular/core';
import {CoreService, MessageDialogService} from "@servicesApp/core";
import {AgreementModel, ColumnModel} from '@models/core';
import {
  AddendumEnum,
  AgreementSectionFormEnum,
  FileFormEnum,
  FinancingsFormEnum,
  ObligationForEnum
} from "@shared/enums";
import {AgreementFormEnum} from '@shared/enums';

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.scss']
})
export class FinancingComponent {
  /** Services **/
  protected readonly coreService = inject(CoreService);
  protected readonly messageDialogService = inject(MessageDialogService);

  /** Form **/
  @Input({required: true}) agreement!: AgreementModel;
  protected columns: ColumnModel[] = [];

  /** Enums **/
  protected readonly FinancingsFormEnum = FinancingsFormEnum;
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly ObligationForEnum = ObligationForEnum
  protected readonly AgreementSectionFormEnum = AgreementSectionFormEnum;

  constructor() {
    this.buildAddendumColumns();
  }

  buildAddendumColumns() {
    this.columns = [
      {field: 'institutionName', header: ObligationForEnum.institutionName},
      {field: 'budget', header: FinancingsFormEnum.budget},
      {field: 'paymentMethod', header: FinancingsFormEnum.paymentMethod},
      {field: 'source', header: FinancingsFormEnum.source},
    ];
  }
}
