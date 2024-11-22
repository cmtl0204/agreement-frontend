import {AfterContentInit, AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ColumnModel,
  AgreementModel,
  CatalogueModel,
  FileModel,
  PeriodModel,
  ClosingLogModel,
  ClosingNotificationModel, TrackingLogModel
} from '@models/core';
import {
  CoreService,
  BreadcrumbService,
  MessageService,
  AgreementsService,
  MessageDialogService
} from '@servicesApp/core';
import {
  AgreementsHttpService,
  CataloguesHttpService, ClosingLogsHttpService,
  FilesHttpService, PeriodsHttpService,
  TrackingLogsHttpService
} from '@servicesHttp/core';
import {
  IconButtonActionEnum,
  SeverityButtonActionEnum,
  LabelButtonActionEnum,
  BreadcrumbEnum,
  IdButtonActionEnum,
  TableEnum,
  AddendumEnum,
  CatalogueTypeEnum,
  PeriodEnum,
  CatalogueTrackingLogsStateEnum,
  FileEnum,
  CatalogueClosingNotificationsCloseTypesDocumentEnum, TrackingLogEnum
} from '@shared/enums';
import {PrimeIcons, MenuItem, ConfirmationService} from 'primeng/api';
import {AuthService} from "@servicesApp/auth";

@Component({
  selector: 'app-closing-log-list',
  templateUrl: './closing-log-list.component.html',
  styleUrl: './closing-log-list.component.scss'
})
export class ClosingLogListComponent implements OnInit {
  @Input({required: true}) agreementId!: string;

  // Services
  protected readonly authService = inject(AuthService);
  protected readonly coreService = inject(CoreService);
  private readonly closingLogsHttpService = inject(ClosingLogsHttpService);

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

  protected items: ClosingLogModel[] = [];
  protected selectedItem!: TrackingLogModel;
  protected isVisibleAgreementView: boolean = false;

  constructor() {
    this.buildColumns();
  }

  ngOnInit() {
    this.findClosingLogsByAgreement();
  }

  buildColumns() {
    this.columns = [
      {field: 'state', header: TrackingLogEnum.state},
      {field: 'registeredAt', header: TrackingLogEnum.registeredAt},
      {field: 'user', header: TrackingLogEnum.user},
    ];
  }

  findClosingLogsByAgreement() {
    this.closingLogsHttpService.findClosingLogsByAgreement(this.agreementId)
      .subscribe((response) => {
        if (response) {
          this.items = response;
        }
      });
  }

  downloadLog() {
    this.closingLogsHttpService.downloadLog(this.agreementId);
  }
}
