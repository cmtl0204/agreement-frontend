import { Component, Input } from '@angular/core';
import { AgreementModel } from '@models/core';
import {AgreementFormEnum, AgreementStateEnum} from '@shared/enums';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrl: './basic-data.component.scss'
})
export class BasicDataComponent {
  /** Form **/
  @Input({required: true}) agreement!: AgreementModel;

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly AgreementStateEnum = AgreementStateEnum;
}
