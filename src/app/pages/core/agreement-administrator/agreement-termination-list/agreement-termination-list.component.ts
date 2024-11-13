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
  ClosingNotificationEnum, BreadcrumbEnum
} from '@shared/enums';
import {AuthService} from "@servicesApp/auth";
import {verifyAgreementInternalNumber} from "@shared/validators";
import {PrimeIcons} from "primeng/api";

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
  protected readonly closingNotificationsHttpService = inject(ClosingNotificationsHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly formBuilder = inject(FormBuilder);

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
      agreementId: [null, Validators.required],
      closedAt: [null, Validators.required],
      closeDetail: [null, Validators.required],
      closeType: [null, Validators.required],
    });
  }

  createClosingNotification() {
    this.closingNotificationsHttpService.findClosingNotificationByAgreement(this.agreementId).subscribe(response => {
      this.closingNotification = response;
    });
  }

  findClosingNotificationByAgreement() {
    this.closingNotificationsHttpService.findClosingNotificationByAgreement(this.agreementId).subscribe(response => {
      if (response)
        this.closingNotification = response;
      else
        this.form.disable();
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
      this.createClosingNotification();
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
