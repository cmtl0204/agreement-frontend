import {Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ColumnModel, AgreementModel, CatalogueModel, FileModel, PeriodModel} from '@models/core';
import {
  CoreService,
  BreadcrumbService,
  MessageService,
  AgreementsService,
  MessageDialogService
} from '@servicesApp/core';
import {
  AgreementsHttpService,
  CataloguesHttpService,
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
  AddendumEnum, CatalogueTypeEnum, PeriodEnum, CatalogueTrackingLogsStateEnum, FileEnum
} from '@shared/enums';
import {PrimeIcons, MenuItem, ConfirmationService} from 'primeng/api';
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
  private readonly confirmationService = inject(ConfirmationService);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  private readonly trackingLogsHttpService = inject(TrackingLogsHttpService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly filesHttpService = inject(FilesHttpService);
  private readonly agreementsService = inject(AgreementsService);
  private readonly router = inject(Router);
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
  protected agreement!: AgreementModel;
  protected form!: FormGroup;
  protected formErrors: string[] = [];
  protected types: CatalogueModel[] = [];
  protected trackingLogType: string = 'closing';

  protected isVisibleFilesModal: boolean = false;
  protected isVisibleTrackingLogModal: boolean = false;
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly CatalogueTrackingLogsStateEnum = CatalogueTrackingLogsStateEnum;
  protected readonly PeriodEnum = PeriodEnum;
  protected readonly FileEnum = FileEnum;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: ['/core/agreement-administrator/agreement-list']},
      {label: BreadcrumbEnum.PERIODS_CLOSING_ADMINISTRATOR},
    ]);

    this.buildForm();
    this.buildButtonActions();
    this.buildColumns();
    // this.paginator = this.coreService.paginator;

    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.findPeriodsByAgreement();
    });
  }

  ngOnInit() {
    this.findPeriodsByAgreement();
    this.findAgreement(this.agreementId);
    this.loadTypes();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      reportFile: [null, Validators.required],
      evidenceFile: [null],
    })
  }

  findAgreement(id: string) {
    this.agreementsHttpService.findOne(id).subscribe(agreement => {
      this.agreement = agreement;
    });
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

  createPeriod() {
    this.trackingLogsHttpService.createPeriod(this.agreementId, this.trackingLogType)
      .subscribe((response) => {
        this.findPeriodsByAgreement();
      });
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
    ];
  }

  validateButtonActions(item: PeriodModel) {
    this.buildButtonActions();

  }

  remove(id: string) {
    // this.messageService.questionDelete()
    //   .then((result) => {
    //     if (result.isConfirmed) {
    //       this.agreementsHttpService.remove(id).subscribe((user) => {
    //         this.items = this.items.filter(item => item.id !== user.id);
    //         this.paginator.totalItems--;
    //       });
    //     }
    //   });
  }

  paginate(event: any) {
    // this.findAgreements(event.page);
  }

  selectItem(item: PeriodModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    this.validateButtonActions(item);
  }

  showFilesModal(item: PeriodModel) {
    this.selectedItem = item;
    this.isVisibleFilesModal = true;
  }

  downloadFile(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }

  onUpload() {
    if (this.validateFilesForm()) {
      this.confirmationService.confirm({
        key: 'confirmDialog',
        message: '¿Está seguro de subir los archivos?',
        header: '',
        icon: PrimeIcons.QUESTION_CIRCLE,
        acceptLabel: "Si",
        rejectLabel: "No",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          const formData = new FormData();

          formData.append('report', this.reportFileField.value);
          formData.append('evidence', this.evidenceFileField.value);

          this.trackingLogsHttpService.createTrackingLog(this.selectedItem.id!, formData, this.trackingLogType).subscribe(response => {
            this.findPeriodsByAgreement();
            this.isVisibleFilesModal = false;
            this.reportFileField.setValue(null);
            this.evidenceFileField.setValue(null);
          });
        }
      });

    } else {
      this.messageDialogService.fieldErrors(this.formErrors);
    }
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

  closeModal() {
    this.isVisibleFilesModal = false;
    this.reportFileField.setValue(null);
    this.evidenceFileField.setValue(null);
  }

  get reportFileField(): AbstractControl {
    return this.form.controls['reportFile'];
  }

  get evidenceFileField(): AbstractControl {
    return this.form.controls['evidenceFile'];
  }
}
