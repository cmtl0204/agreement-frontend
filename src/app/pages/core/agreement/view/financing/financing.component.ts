import {Component, inject, Input, OnInit} from '@angular/core';
import {CoreService, MessageDialogService} from "@servicesApp/core";
import {AgreementModel} from '@models/core';
import {FinancingsFormEnum} from "@shared/enums";

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

  /** Enums **/
  protected readonly FinancingsFormEnum = FinancingsFormEnum;
}
