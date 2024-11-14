import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgreementModel, CatalogueModel, ClosingNotificationModel} from '@models/core';
import {BreadcrumbService, CoreService, MessageDialogService} from '@servicesApp/core';
import {AgreementsHttpService, CataloguesHttpService, ClosingNotificationsHttpService} from '@servicesHttp/core';
import {
  AgreementFormEnum,
  SkeletonEnum,
  CatalogueTypeEnum,
  CatalogueAgreementsTypeEnum,
  AgreementStateEnum,
  RoleEnum,
  CatalogueAgreementsOriginEnum,
  CatalogueAgreementStatesStateEnum,
  ClosingNotificationEnum, BreadcrumbEnum, CatalogueClosingNotificationsCloseTypeEnum
} from '@shared/enums';
import {AuthService} from "@servicesApp/auth";
import {verifyAgreementInternalNumber} from "@shared/validators";
import {ConfirmationService, PrimeIcons} from "primeng/api";
import {getFormattedDate} from "@shared/helpers";

@Component({
  selector: 'app-agreement-termination-list',
  templateUrl: './agreement-termination-list.component.html',
  styleUrl: './agreement-termination-list.component.scss'
})
export class AgreementTerminationListComponent implements OnInit {
  /** Services **/
  protected readonly authService = inject(AuthService);
  protected readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly confirmationService = inject(ConfirmationService);
  protected readonly closingNotificationsHttpService = inject(ClosingNotificationsHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly formBuilder = inject(FormBuilder);
  protected endedAt!: Date;


  /** Input Output **/
  protected readonly Validators = Validators;
  @Input({required: true}) agreementId!: string;

  /** Form **/
  protected form!: FormGroup;
  private formErrors: string[] = [];

  /** Foreign Keys **/
  protected closingNotification!: ClosingNotificationModel;
  protected closeTypes: CatalogueModel[] = [];

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly AgreementStateEnum = AgreementStateEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly ClosingNotificationEnum = ClosingNotificationEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: [`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.CLOSING_NOTIFICATION},
    ]);

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
    this.closingNotificationsHttpService.createClosingNotificationByAgreement(this.form.value).subscribe(response => {
      this.findClosingNotificationByAgreement();
    });
  }

  updateClosedAt() {
    this.closingNotificationsHttpService.updateClosedAt(this.idField.value, this.closedAtField.value).subscribe(response => {
      this.findClosingNotificationByAgreement();
    });
  }

  findClosingNotificationByAgreement() {
    this.closingNotificationsHttpService.findClosingNotificationByAgreement(this.agreementId).subscribe(response => {
      if (response) {
        this.closingNotification = response;
        this.form.patchValue(response);

        if (this.closingNotification.closeType?.code === CatalogueClosingNotificationsCloseTypeEnum.MUTUAL
          || this.closingNotification.closeType?.code === CatalogueClosingNotificationsCloseTypeEnum.OBJECT
          || this.closingNotification.closeType?.code === CatalogueClosingNotificationsCloseTypeEnum.UNILATERAL) {
          this.form.disable();
        }

        if (response.closedAt) {
          this.closedAtField.setValue(getFormattedDate(response.closedAt));
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

  onUpdate(): void {
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

  protected readonly CatalogueAgreementsTypeEnum = CatalogueAgreementsTypeEnum;
  protected readonly CatalogueClosingNotificationsCloseTypeEnum = CatalogueClosingNotificationsCloseTypeEnum;
}
