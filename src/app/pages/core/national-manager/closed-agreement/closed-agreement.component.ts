import {Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ColumnModel,
  AgreementModel,
  CatalogueModel,
  FileModel,
  ClosingLogModel,
  ClosingNotificationModel, ClosedAgreementModel
} from '@models/core';
import {
  CoreService,
  BreadcrumbService,
  MessageService,
  MessageDialogService
} from '@servicesApp/core';
import {
  AgreementsHttpService,
  CataloguesHttpService, ClosedAgreementsHttpService,
  ClosingLogsHttpService,
  FilesHttpService,
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
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-closed-agreement',
  templateUrl: './closed-agreement.component.html',
  styleUrl: './closed-agreement.component.scss'
})
export class ClosedAgreementComponent implements OnInit {
  @Input() agreementId!: string;

  protected checked: boolean = false;
  protected closedAgreement!: ClosedAgreementModel;
  protected fileType!: CatalogueModel | undefined;

  // Services
  protected readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly closedAgreementsHttpService = inject(ClosedAgreementsHttpService);
  private readonly cataloguesHttpService = inject(CataloguesHttpService);
  private readonly filesHttpService = inject(FilesHttpService);

  protected readonly PrimeIcons = PrimeIcons;
  protected readonly FileEnum = FileEnum;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: [`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.PERIODS},
    ]);
  }

  ngOnInit() {
    this.findClosedAgreementByAgreement();
    this.loadFileType();
  }

  loadFileType() {
    this.fileType = this.cataloguesHttpService.findByCode('CLOSED_AGREEMENT', CatalogueTypeEnum.CLOSED_AGREEMENTS_DOCUMENT);
    console.log(this.fileType);
  }

  closeAgreement() {
    this.closedAgreementsHttpService.updateClose(this.agreementId).subscribe(() => {
      this.checked = true;
      this.findClosedAgreementByAgreement();
    });
  }

  findClosedAgreementByAgreement() {
    this.closedAgreementsHttpService.findClosedAgreementByAgreement(this.agreementId).subscribe(response => {
      if (response) {
        if (!response.closingDate) {
          this.checked = true;
        }

        this.closedAgreement = response;
      }
    });
  }

  uploadFile(event: any) {
    const formData = new FormData();

    formData.append('file', event.files[0]);

    this.closedAgreementsHttpService.uploadFile(this.closedAgreement.id, formData).subscribe(response => {
      this.findClosedAgreementByAgreement();
    });
  }

  download(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
