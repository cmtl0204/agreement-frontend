import {Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ColumnModel, AgreementModel, CatalogueModel, FileModel, PeriodModel} from '@models/core';
import {
  CoreService,
  BreadcrumbService,
  MessageService,
  MessageDialogService
} from '@servicesApp/core';
import {
  CataloguesHttpService, FilesHttpService,
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
  CatalogueTrackingLogsStateEnum
} from '@shared/enums';
import {PrimeIcons, MenuItem} from 'primeng/api';
import {debounceTime} from 'rxjs';
import {AuthService} from "@servicesApp/auth";

@Component({
  selector: 'app-period-closing-list',
  templateUrl: './period-closing-list.component.html',
  styleUrl: './period-closing-list.component.scss'
})
export class PeriodClosingListComponent implements OnInit {
  @Input() agreementId!: string;

  // Services
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly authService = inject(AuthService);
  protected readonly coreService = inject(CoreService);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  private readonly trackingLogsHttpService = inject(TrackingLogsHttpService);
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

  protected selectedItem!: PeriodModel;
  protected items: PeriodModel[] = [];
  protected form!: FormGroup;
  protected formErrors: string[] = [];
  protected types: CatalogueModel[] = [];
  protected trackingLogType: string = 'closing';

  protected isVisibleFilesModal: boolean = false;
  protected isVisibleTrackingLogModal: boolean = false;
  protected isVisibleRefusedModal: boolean = false;
  protected isVisibleAcceptedModal: boolean = false;
  protected readonly AddendumEnum = AddendumEnum;
  protected observation!: string;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: [`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.PERIODS_CLOSING_SUPERVISOR}
    ]);

    this.buildForm();
    this.buildButtonActions();
    this.buildColumns();

    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.findPeriodsByAgreement();
    });
  }

  ngOnInit() {
    this.findPeriodsByAgreement();
    this.loadTypes();

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

  findPeriodsByAgreement() {
    this.trackingLogsHttpService.findPeriodsByAgreement(this.agreementId, this.trackingLogType)
      .subscribe((response) => {
        this.items = response;
      });
  }

  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.PERIODS_TRACKING_LOG);
  }

  buildColumns() {
    this.columns = [
      {field: 'name', header: PeriodEnum.reportPeriod},
      {field: 'documentName', header: PeriodEnum.name},
      {field: 'files', header: PeriodEnum.documentName},
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

  validateButtonActions(item: PeriodModel) {
    this.buildButtonActions();

    if (!item.trackingLog
      || item.trackingLog.state?.code === CatalogueTrackingLogsStateEnum.ACCEPTED
      || item.trackingLog.state?.code === CatalogueTrackingLogsStateEnum.REFUSED) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.ACCEPTED), 1);
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.REFUSED), 1);
    }
  }

  selectItem(item: PeriodModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    this.validateButtonActions(item);
  }

  downloadFile(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }

  validateFilesForm() {
    this.formErrors = [];

    if (this.reportFileField.invalid) this.formErrors.push(PeriodEnum.reportFile);
    if (this.evidenceFileField.invalid) this.formErrors.push(PeriodEnum.evidenceFile);

    return this.formErrors.length === 0
  }

  uploadReportFile(event: any, uploadFiles: any) {
    this.reportFileField.patchValue(event.files[0]);

    uploadFiles.clear();
  }

  uploadEvidenceFile(event: any, uploadFiles: any) {
    this.evidenceFileField.patchValue(event.files[0]);

    uploadFiles.clear();
  }

  refuseTrackingLogDocuments() {
    this.trackingLogsHttpService.changeState(this.selectedItem.trackingLog.id, false, this.observationFileField.value).subscribe(() => {
      this.findPeriodsByAgreement();
      this.isVisibleRefusedModal = false;
      this.observation = '';
    });
  }

  acceptTrackingLogDocuments() {
    this.trackingLogsHttpService.changeState(this.selectedItem.trackingLog.id, true).subscribe(() => {
      this.findPeriodsByAgreement();
      this.isVisibleAcceptedModal = false;
    });
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
