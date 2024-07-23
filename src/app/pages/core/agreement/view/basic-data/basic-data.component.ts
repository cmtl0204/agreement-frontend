import { Component, inject, Input, OnInit } from '@angular/core';
import { AgreementStateModel } from '@models/core';
import { AgreementModel } from '@models/core/agreement.model';
import { AgreementFormEnum } from '@shared/enums';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss'
})
export class BasicDataComponent {

  /** Form **/
  @Input({required: true}) agreement!: AgreementModel;
  @Input({required: true}) agreementState!: AgreementStateModel;

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;

}
