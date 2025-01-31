import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {
  BreadcrumbEnum, CatalogueClosingNotificationsCloseTypeEnum,
  CatalogueClosingNotificationsCloseTypesDocumentEnum, CatalogueTypeEnum,
  ClosingNotificationEnum
} from "@shared/enums";
import {ConfirmationService, PrimeIcons} from "primeng/api";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CatalogueModel, ClosingNotificationModel} from "@models/core";
import {getCustomFormattedDate} from "@shared/helpers";
import {BreadcrumbService, CoreService, MessageDialogService} from "@servicesApp/core";
import {
  AgreementsHttpService,
  CataloguesHttpService,
  ClosingNotificationsHttpService,
  TrackingLogsHttpService
} from "@servicesHttp/core";

@Component({
  selector: 'app-closing-notification',
  templateUrl: './closing-notification.component.html',
  styleUrl: './closing-notification.component.scss'
})
export class ClosingNotificationComponent {
  @Input({required: true}) agreementId!: string;
  @Output() closingNotificationOut: EventEmitter<ClosingNotificationModel> = new EventEmitter();

  protected readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly confirmationService = inject(ConfirmationService);
  protected readonly closingNotificationsHttpService = inject(ClosingNotificationsHttpService);
  protected readonly trackingLogsHttpService = inject(TrackingLogsHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly formBuilder = inject(FormBuilder);

  protected readonly ClosingNotificationEnum = ClosingNotificationEnum;
  protected readonly CatalogueClosingNotificationsCloseTypeEnum = CatalogueClosingNotificationsCloseTypeEnum;
  protected readonly PrimeIcons = PrimeIcons;

  protected form!: FormGroup;
  private formErrors: string[] = [];

  protected closingNotification!: ClosingNotificationModel;
  protected closeTypes: CatalogueModel[] = [];
  protected endedAt!: Date;

  constructor() {
    this.buildForm();
  }

  ngOnInit() {
    this.loadCloseTypes();
    this.findClosingNotificationByAgreement();
  }


  /* Form Builder & Validates */
  buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      agreement: [null, Validators.required],
      closedAt: [null, Validators.required],
      closeDetail: [null, Validators.required],
      closeType: [null, Validators.required],
    });
  }

  createClosingNotification() {
    this.agreementField.patchValue({id: this.agreementId});

    this.closingNotificationsHttpService.createClosingNotificationByAgreement(this.form.value).subscribe(response => {
      this.findClosingNotificationByAgreement();
    });
  }

  findClosingNotificationByAgreement() {
    this.closingNotificationsHttpService.findClosingNotificationByAgreement(this.agreementId).subscribe(response => {
      if (response) {
        this.closingNotification = response;
        this.closingNotificationOut.emit(response);
        this.form.patchValue(response);

        if (this.closingNotification.closeType?.code === CatalogueClosingNotificationsCloseTypeEnum.MUTUAL
          || this.closingNotification.closeType?.code === CatalogueClosingNotificationsCloseTypeEnum.OBJECT
          || this.closingNotification.closeType?.code === CatalogueClosingNotificationsCloseTypeEnum.UNILATERAL) {
          this.form.disable();
        }

        if (this.closingNotification.closeType?.code === CatalogueClosingNotificationsCloseTypeEnum.TERM) {
          this.closeDetailField.clearValidators();
        }

        if (response.closedAt) {
          this.closedAtField.setValue(getCustomFormattedDate(response.closedAt));
          this.form.disable();
        }

        this.endedAt = new Date(this.closingNotification.agreement.endedAt + 'T05:00:00');
      }
    });
  }

  validateForm() {
    this.formErrors = [];

    if (this.closedAtField.invalid) this.formErrors.push(ClosingNotificationEnum.closedAt);
    if (this.closeDetailField.invalid) this.formErrors.push(ClosingNotificationEnum.closeDetail);
    if (this.closeTypeField.invalid) this.formErrors.push(ClosingNotificationEnum.closeType);

    return this.formErrors.length === 0;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.confirmationService.confirm({
        key: 'confirmDialog',
        message: '¿Está seguro de notificar la terminiación del convenio?',
        header: '',
        icon: PrimeIcons.QUESTION_CIRCLE,
        acceptLabel: "Si",
        rejectLabel: "No",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.createClosingNotification();
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  /* Load Foreign Keys  */
  loadCloseTypes() {
    this.closeTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.CLOSING_NOTIFICATIONS_CLOSE_TYPE);
  };

  /* Getters Form*/
  get idField(): AbstractControl {
    return this.form.controls['id'];
  }

  get agreementField(): AbstractControl {
    return this.form.controls['agreement'];
  }

  get closedAtField(): AbstractControl {
    return this.form.controls['closedAt'];
  }

  get closeDetailField(): AbstractControl {
    return this.form.controls['closeDetail'];
  }

  get closeTypeField(): AbstractControl {
    return this.form.controls['closeType'];
  }

}
