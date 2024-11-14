import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ColumnModel, PeriodModel, TrackingLogModel} from '@models/core';
import {
  CoreService,
  BreadcrumbService,
  MessageService,
  MessageDialogService
} from '@servicesApp/core';
import {
  IconButtonActionEnum,
  SeverityButtonActionEnum,
  LabelButtonActionEnum,
  BreadcrumbEnum,
  TableEnum,
  AgreementFormEnum, TrackingLogEnum,
} from '@shared/enums';
import {PrimeIcons, MenuItem} from 'primeng/api';
import {AuthService} from "@servicesApp/auth";
import {TrackingLogsHttpService} from "@servicesHttp/core";

@Component({
  selector: 'app-tracking-log-list',
  templateUrl: './tracking-log-list.component.html',
  styleUrl: './tracking-log-list.component.scss'
})
export class TrackingLogListComponent implements OnInit {
  @Input() period!: PeriodModel;

  // Services
  protected readonly authService = inject(AuthService);
  protected readonly coreService = inject(CoreService);
  private readonly router = inject(Router);
  private readonly trackingLogsHttpService = inject(TrackingLogsHttpService);

  protected readonly PrimeIcons = PrimeIcons;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly BreadcrumbEnum = BreadcrumbEnum;
  protected readonly TableEnum = TableEnum;

  protected readonly messageService = inject(MessageService);
  protected readonly messageDialogService = inject(MessageDialogService);

  protected buttonActions: MenuItem[] = [];

  protected columns: ColumnModel[] = [];

  protected search: FormControl = new FormControl('');

  protected items: TrackingLogModel[] = [];
  protected selectedItem!: TrackingLogModel;
  protected isVisibleAgreementView: boolean = false;

  constructor() {
    this.buildColumns();
  }

  ngOnInit() {
    this.items = this.period.trackingLogs;
  }

  buildColumns() {
    this.columns = [
      {field: 'state', header: TrackingLogEnum.state},
      {field: 'registeredAt', header: TrackingLogEnum.registeredAt},
      {field: 'user', header: TrackingLogEnum.user},
    ];
  }

  redirectAgreementLogForm(id: string) {
    this.router.navigate(['/core/agreements/log', id]);
  }

  downloadLog() {
    this.trackingLogsHttpService.downloadLog(this.period.id,'execution');
  }
}
