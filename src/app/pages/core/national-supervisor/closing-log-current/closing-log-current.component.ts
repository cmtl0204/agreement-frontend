import {Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
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
import {PrimeIcons, MenuItem} from 'primeng/api';
import {AuthService} from "@servicesApp/auth";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-closing-log-current',
  templateUrl: './closing-log-current.component.html',
  styleUrl: './closing-log-current.component.scss'
})
export class ClosingLogCurrentComponent implements OnInit {
  @Input() agreementId!: string;
  @Input() closingNotification!: ClosingNotificationModel;

  // Services
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly authService = inject(AuthService);
  protected readonly coreService = inject(CoreService);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  private readonly trackingLogsHttpService = inject(TrackingLogsHttpService);
  private readonly closingLogsHttpService = inject(ClosingLogsHttpService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly closedAgreementsHttpService = inject(ClosedAgreementsHttpService);
  private readonly filesHttpService = inject(FilesHttpService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected readonly PrimeIcons = PrimeIcons;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly BreadcrumbEnum = BreadcrumbEnum;
  protected readonly TableEnum = TableEnum;

  protected readonly messageService = inject(MessageService);
  protected readonly messageDialogService = inject(MessageDialogService);

  protected buttonActions: MenuItem[] = [];
  protected isButtonActions: boolean = false;

  protected columns: ColumnModel[] = [];

  protected search: FormControl = new FormControl('');

  protected selectedItem!: ClosingLogModel;
  protected items: ClosingLogModel[] = [];
  protected agreement!: AgreementModel;
  protected form!: FormGroup;
  protected formErrors: string[] = [];
  protected files: FileModel[] = [];
  protected types: CatalogueModel[] = [];
  protected closeTypes: CatalogueModel[] = [];
  protected trackingLogType: string = 'execution';
  protected isVisibleRefusedModal: boolean = false;
  protected isVisibleAcceptedModal: boolean = false;

  protected isVisibleFilesModal: boolean = false;
  protected isVisibleTrackingLogModal: boolean = false;
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly CatalogueTrackingLogsStateEnum = CatalogueTrackingLogsStateEnum;
  protected readonly CatalogueClosingNotificationsCloseTypesDocumentEnum = CatalogueClosingNotificationsCloseTypesDocumentEnum;
  protected readonly FileEnum = FileEnum;
  protected validPeriodsClosing: boolean = false;
  protected validPeriodsExecution: boolean = false;
  protected checked: boolean = false;
  protected closingLogCurrent!: ClosingLogModel;
  protected closedAgreement!: ClosedAgreementModel;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: [`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.PERIODS},
    ]);

    this.buildForm();
    this.buildButtonActions();
    this.buildColumns();
  }

  ngOnInit() {
    this.findClosingLogCurrentByAgreement();
    this.findAgreement(this.agreementId);
    this.findClosedAgreementByAgreement();
    this.loadTypes();
    this.loadTypesByCloseType();

    setTimeout(() => {
      // this.validatePeriodsClosing();
      this.validatePeriods();
    }, 500);

    this.activatedRoute.queryParams.subscribe(params => {
      this.trackingLogType = params['type'];
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      reportFile: [null, Validators.required],
      evidenceFile: [null],
      observation: [null, Validators.required]
    })
  }

  findAgreement(id: string) {
    this.agreementsHttpService.findOne(id).subscribe(agreement => {
      this.agreement = agreement;
    });
  }

  findClosingLogCurrentByAgreement() {
    this.closingLogsHttpService.findClosingLogCurrentByAgreement(this.agreementId)
      .subscribe((response) => {
        if (response) {
          this.items = [response];
          this.closingLogCurrent = response;
        }
      });
  }

  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.PERIODS_TRACKING_LOG);
  }

  loadTypesByCloseType() {
    this.closeTypes = this.cataloguesHttpService.findByParent(this.closingNotification?.closeType?.id!);
  }

  createClosingLog() {
    const payload = new FormData();

    for (const myFile of this.files) {
      payload.append('typeIds', myFile.type!.id!);
      payload.append('files', myFile.file);
    }

    this.closingLogsHttpService.createClosingLog(this.agreementId, payload)
      .subscribe((response) => {
        this.findClosingLogCurrentByAgreement();
        this.isVisibleFilesModal = false;
      });
  }

  onUpload(event: any, uploadFiles: any, type: CatalogueModel) {
    const index = this.files.findIndex(item => item.type?.id === type.id);

    if (index === -1) {
      this.files.push({
        type,
        file: event.files[0]
      });
    } else {
      this.files[index] = {
        type,
        file: event.files[0]
      };
    }

    uploadFiles.clear();
  }

  onSubmit() {
    if (this.validateFilesForm()) {
      this.createClosingLog();
    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  buildColumns() {
    this.columns = [
      {field: 'closingLogDocumentsUpload', header: PeriodEnum.documentName},
      {field: 'closingLogDocuments', header: PeriodEnum.fileName},
      {field: 'trafficLight', header: PeriodEnum.trafficLight},
      {field: 'uploadedAt', header: PeriodEnum.uploadedAt},
      {field: 'user', header: PeriodEnum.user},
      {field: 'state', header: PeriodEnum.state},
    ];
  }

  /** Button Actions**/
  buildButtonActions() {
    this.buttonActions = [
      {
        id: IdButtonActionEnum.TRACKING_LOG,
        label: LabelButtonActionEnum.TRACKING_LOG,
        icon: IconButtonActionEnum.TRACKING_LOG,
        command: () => {
          this.isVisibleTrackingLogModal = true;
        },
      },
      {
        id: IdButtonActionEnum.ACCEPTED,
        label: LabelButtonActionEnum.ACCEPTED,
        icon: IconButtonActionEnum.ACCEPTED,
        command: () => {
          this.isVisibleAcceptedModal = true;
        },
      },
      {
        id: IdButtonActionEnum.REFUSED,
        label: LabelButtonActionEnum.REFUSED,
        icon: IconButtonActionEnum.REFUSED,
        command: () => {
          this.isVisibleRefusedModal = true;
        },
      },
    ];
  }

  validateButtonActions(item: ClosingLogModel) {
    this.buildButtonActions();

    if (!item
      || item.state?.code === CatalogueTrackingLogsStateEnum.ACCEPTED
      || item.state?.code === CatalogueTrackingLogsStateEnum.REFUSED) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.ACCEPTED), 1);
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.REFUSED), 1);
    }
  }

  selectItem(item: ClosingLogModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    this.validateButtonActions(item);
  }

  downloadFile(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }

  refuseTrackingLogDocuments() {
    if (this.observationFileField.valid) {
      this.closingLogsHttpService.changeState(this.selectedItem.id, false, this.observationFileField.value).subscribe(() => {
        this.findClosingLogCurrentByAgreement();
        this.isVisibleRefusedModal = false;
        this.observationFileField.reset();
      });
    } else {
      this.form.markAllAsTouched();
      this.formErrors = [TrackingLogEnum.observation];
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  acceptTrackingLogDocuments() {
    this.closingLogsHttpService.changeState(this.selectedItem.id, true).subscribe(() => {
      this.findClosingLogCurrentByAgreement();
      this.isVisibleAcceptedModal = false;
    });
  }

  validateFilesForm() {
    this.formErrors = [];

    this.closeTypes.forEach(item => {
      const document = this.files.find(file => file.type?.id === item?.id);

      if (!document) {
        this.formErrors.push(item.name!);
      }
    });

    return this.formErrors.length === 0
  }

  closeModal() {
    this.isVisibleFilesModal = false;
    this.reportFileField.setValue(null);
    this.evidenceFileField.setValue(null);
  }

  validatePeriods() {
    this.validPeriodsClosing = false;
    this.validPeriodsExecution = false;

    if (this.closingNotification) {
      if (this.closingNotification.closeType?.code === CatalogueClosingNotificationsCloseTypesDocumentEnum.TERM) {
        forkJoin(this.trackingLogsHttpService.validationPeriods(this.agreementId, 'execution'), this.trackingLogsHttpService.validationPeriods(this.agreementId, 'closing'))
          .subscribe(response => {
            if (response.length > 0) {
              this.validPeriodsExecution = response[0];
              this.validPeriodsClosing = response[1];
            }
          });
      }
    }
  }

  closeAgreement() {
    this.closedAgreementsHttpService.createClose(this.agreementId).subscribe(() => {
      this.checked = true;
      this.findClosedAgreementByAgreement();
    });
  }

  findClosedAgreementByAgreement() {
    this.closedAgreementsHttpService.findClosedAgreementByAgreement(this.agreementId).subscribe(response => {
      if (response) {
        this.checked = true;
        this.closedAgreement = response;
      }
    });
  }

  cancelRefusedModal(){
    this.isVisibleRefusedModal = false;
    this.observationFileField.reset();
  }

  get reportFileField(): AbstractControl {
    return this.form.controls['reportFile'];
  }

  get evidenceFileField(): AbstractControl {
    return this.form.controls['evidenceFile'];
  }

  get observationFileField(): AbstractControl {
    return this.form.controls['observation'];
  }
}
