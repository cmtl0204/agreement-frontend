import {Component, OnInit, Input} from '@angular/core';
import {AgreementFormEnum, AgreementSectionFormEnum, RoutesEnum} from '@shared/enums';
import {CoreService} from '@servicesApp/core';
import {PrimeIcons} from 'primeng/api';
import {AgreementModel} from "@models/core";

@Component({
  selector: 'app-agreement-date',
  templateUrl: './agreement-date.component.html',
  styleUrls: ['./agreement-date.component.scss']
})
export class AgreementDateComponent {
  @Input({required: true}) agreement!: AgreementModel;

  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly AgreementSectionFormEnum = AgreementSectionFormEnum;

}
