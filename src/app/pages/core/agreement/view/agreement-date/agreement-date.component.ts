import { Component, OnInit, Input } from '@angular/core';
import { AgreementFormEnum, RoutesEnum } from '@shared/enums';
import { CoreService } from '@servicesApp/core';
import { PrimeIcons } from 'primeng/api';
import { AgreementModel } from "@models/core";

@Component({
  selector: 'app-agreement-date',
  templateUrl: './agreement-date.component.html',
  styleUrls: ['./agreement-date.component.scss']
})
export class AgreementDateComponent implements OnInit {
  @Input({required: true}) agreement!: AgreementModel;
  protected id: string = RoutesEnum.NEW;
  protected isFinishDate: boolean = true;

  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor(protected coreService: CoreService) {}

  ngOnInit(): void {}

  protected onFinishDateChange(value: boolean): void {
    this.isFinishDate = value;
    if (value) {
      this.agreement.endedReason = '';
    } else {
      this.agreement.endedAt = new Date();
    }
  }
}
