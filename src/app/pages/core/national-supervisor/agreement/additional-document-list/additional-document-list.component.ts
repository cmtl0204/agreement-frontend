import {Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ColumnModel, CatalogueModel, FileModel, PeriodModel, AdditionalDocumentModel} from '@models/core';
import {
  CoreService,
  BreadcrumbService,
  MessageService,
  AgreementsService,
  MessageDialogService
} from '@servicesApp/core';
import {
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
  AddendumEnum, CatalogueTypeEnum, PeriodEnum, CatalogueTrackingLogsStateEnum, AdditionalDocumentEnum
} from '@shared/enums';
import {PrimeIcons, MenuItem, ConfirmationService} from 'primeng/api';
import {debounceTime} from 'rxjs';
import {AuthService} from "@servicesApp/auth";

@Component({
  selector: 'app-additional-document-list',
  templateUrl: './additional-document-list.component.html',
  styleUrl: './additional-document-list.component.scss'
})
export class AdditionalDocumentListComponent implements OnInit {
  @Input() agreementId!: string;
  // Services
  protected readonly authService = inject(AuthService);
  protected readonly coreService = inject(CoreService);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  private readonly trackingLogsHttpService = inject(TrackingLogsHttpService);
  private readonly filesHttpService = inject(FilesHttpService);
  private readonly confirmationService = inject(ConfirmationService);
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

  protected selectedItem!: AdditionalDocumentModel;
  protected items: AdditionalDocumentModel[] = [];
  protected form!: FormGroup;
  protected formErrors: string[] = [];
  protected types: CatalogueModel[] = [];

  protected isVisibleFilesModal: boolean = false;
  protected isVisibleTrackingLogModal: boolean = false;
  protected readonly AddendumEnum = AddendumEnum;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: ['/core/agreement-administrator/agreement-list']},
      {label: BreadcrumbEnum.PERIODS},
    ]);

    this.buildForm();
    this.buildButtonActions();
    this.buildColumns();

    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.findAdditionalDocumentsByAgreement();
    });
  }

  ngOnInit() {
    this.findAdditionalDocumentsByAgreement();
    this.loadTypes();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      reportFile: [null],
      evidenceFile: [null],
      detail: [null, Validators.required],
    })
  }

  findAdditionalDocumentsByAgreement() {
    this.trackingLogsHttpService.findAdditionalDocumentsByAgreement(this.agreementId)
      .subscribe((response) => {
        this.items = response;
      });
  }

  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.PERIODS_TRACKING_LOG);
  }

  buildColumns() {
    this.columns = [
      {field: 'name', header: AdditionalDocumentEnum.name},
      {field: 'detail', header: AdditionalDocumentEnum.detail},
      {field: 'additionalDocuments', header: AdditionalDocumentEnum.additionalDocuments},
      {field: 'uploadedAt', header: AdditionalDocumentEnum.uploadedAt},
      {field: 'user', header: AdditionalDocumentEnum.user},
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

  validateButtonActions(item: AdditionalDocumentModel) {
    this.buildButtonActions();

  }

  remove(id: string) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'No se podrá recuperar la información',
      header: '¿Está seguro de eliminar?',
      icon: PrimeIcons.TRASH,
      acceptLabel: "Si",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.trackingLogsHttpService.deleteAdditionalDocument(id).subscribe(response => {
          this.findAdditionalDocumentsByAgreement();
        });
      }
    });
  }

  selectItem(item: AdditionalDocumentModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    this.validateButtonActions(item);
  }

  showFilesModal() {
    this.isVisibleFilesModal = true;
  }

  downloadFile(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }

  onUpload() {
    if (this.validateFilesForm()) {
      const formData = new FormData();

      formData.append('report', this.reportFileField.value);
      formData.append('evidence', this.evidenceFileField.value);
      formData.append('detail', this.detailField.value);

      this.trackingLogsHttpService.createAdditionalDocument(this.agreementId, formData).subscribe(response => {
        this.findAdditionalDocumentsByAgreement();
        this.isVisibleFilesModal = false;
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

  get reportFileField(): AbstractControl {
    return this.form.controls['reportFile'];
  }

  get evidenceFileField(): AbstractControl {
    return this.form.controls['evidenceFile'];
  }

  get detailField(): AbstractControl {
    return this.form.controls['detail'];
  }

  protected readonly CatalogueTrackingLogsStateEnum = CatalogueTrackingLogsStateEnum;
  protected readonly AdditionalDocumentEnum = AdditionalDocumentEnum;
}
