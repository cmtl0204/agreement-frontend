import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgreementFormEnum, RoutesEnum } from '@shared/enums';
import { CoreService } from '@servicesApp/core'; // Importa el servicio
import { SkeletonEnum } from '@shared/enums/skeleton.enum'; // Importa SkeletonEnum si es necesario
import { PrimeIcons } from 'primeng/api'; // Importa PrimeIcons de PrimeNG

@Component({
  selector: 'app-agreement-date',
  templateUrl: './agreement-date.component.html',
  styleUrls: ['./agreement-date.component.scss']
})
export class AgreementDateComponent implements OnInit {
  @Output() formOutput: EventEmitter<any> = new EventEmitter();

  id: string = RoutesEnum.NEW;

  subscribedAt: Date = new Date('2023-01-01');
  startedAt: Date = new Date('2023-01-01');
  isFinishDate: boolean = true;
  endedAt: Date = new Date('2023-12-31');
  endedReason: string = 'Razón por la que termina';
  yearTerm: number = 1;
  monthTerm: number = 11;
  dayTerm: number = 30;

  readonly AgreementFormEnum = AgreementFormEnum;
  readonly SkeletonEnum = SkeletonEnum;
  readonly PrimeIcons = PrimeIcons;

  constructor(
    public coreService: CoreService // Cambia a público
  ) {}

  ngOnInit(): void {}

  onFinishDateChange(value: boolean) {
    this.isFinishDate = value;
    if (value) {
      this.endedReason = '';
    } else {
      this.endedAt = new Date();
    }
  }

  onSubmit(): void {
    const formData = {
      subscribedAt: this.subscribedAt,
      startedAt: this.startedAt,
      isFinishDate: this.isFinishDate,
      endedAt: this.endedAt,
      endedReason: this.endedReason,
      yearTerm: this.yearTerm,
      monthTerm: this.monthTerm,
      dayTerm: this.dayTerm,
    };
    this.formOutput.emit(formData);
  }
}

