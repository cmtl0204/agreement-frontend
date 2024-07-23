import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AgreementFormEnum, RoutesEnum} from '@shared/enums';
import {CoreService} from '@servicesApp/core';
import {SkeletonEnum} from '@shared/enums/skeleton.enum';
import {PrimeIcons} from 'primeng/api';
import {AgreementModel} from "@models/core";

@Component({
  selector: 'app-agreement-date',
  templateUrl: './agreement-date.component.html',
  styleUrls: ['./agreement-date.component.scss']
})
export class AgreementDateComponent implements OnInit {
  @Input({required: true}) agreement!: AgreementModel;
  public id: string = RoutesEnum.NEW;
  public subscribedAt: Date = new Date('2023-01-01');
  public startedAt: Date = new Date('2023-01-01');
  public isFinishDate: boolean = true;
  public endedAt: Date = new Date('2023-12-31');
  public endedReason: string = 'Razón por la que termina';
  public yearTerm: number = 1;
  public monthTerm: number = 11;
  public dayTerm: number = 30;

  public readonly AgreementFormEnum = AgreementFormEnum;
  public readonly SkeletonEnum = SkeletonEnum;
  public readonly PrimeIcons = PrimeIcons;

  constructor(
    public coreService: CoreService
  ) {
  }

  ngOnInit(): void {
  }

  onFinishDateChange(value: boolean): void {
    this.isFinishDate = value;
    if (value) {
      this.endedReason = '';
    } else {
      this.endedAt = new Date();
    }
  }
}
