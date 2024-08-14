import {Component, inject, Input} from '@angular/core';
import {AgreementModel} from '@models/core';
import {CoreService} from "@servicesApp/core";
import {AgreementSectionFormEnum, FinancingsFormEnum, ObligationDetailForEnum, ObligationForEnum} from "@shared/enums";

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.scss']
})
export class ObligationComponent {
  /** Services **/
  protected readonly coreService = inject(CoreService);
  protected readonly AgreementSectionFormEnum = AgreementSectionFormEnum;

  /** Form **/
  @Input({required: true}) agreement!: AgreementModel;

  /** Enums **/
  protected readonly ObligationForEnum = ObligationForEnum;
  protected readonly FinancingsFormEnum = FinancingsFormEnum;
  protected readonly ObligationDetailForEnum = ObligationDetailForEnum;
}
