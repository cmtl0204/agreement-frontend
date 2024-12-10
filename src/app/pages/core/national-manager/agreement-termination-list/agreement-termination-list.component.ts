import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CatalogueModel, ClosingNotificationModel} from '@models/core';
import {BreadcrumbService, CoreService, MessageDialogService} from '@servicesApp/core';
import {AgreementsHttpService, CataloguesHttpService, ClosingNotificationsHttpService} from '@servicesHttp/core';
import {
  AgreementFormEnum,
  SkeletonEnum,
  CatalogueTypeEnum,
  CatalogueAgreementsTypeEnum,
  AgreementStateEnum,
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

  /** Input Output **/
  protected readonly Validators = Validators;
  @Input({required: true}) agreementId!: string;

  /** Foreign Keys **/
  protected closingNotification!: ClosingNotificationModel;
  protected closeTypes: CatalogueModel[] = [];

  /** Enums **/
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected readonly AgreementStateEnum = AgreementStateEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly ClosingNotificationEnum = ClosingNotificationEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly CatalogueAgreementsTypeEnum = CatalogueAgreementsTypeEnum;
  protected readonly CatalogueClosingNotificationsCloseTypeEnum = CatalogueClosingNotificationsCloseTypeEnum;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: [`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.CLOSING_NOTIFICATION},
    ]);
  }

  ngOnInit() {
    this.loadCloseTypes();
    this.findClosingNotificationByAgreement();
  }

  findClosingNotificationByAgreement() {
    this.closingNotificationsHttpService.findClosingNotificationByAgreement(this.agreementId).subscribe(response => {
      this.closingNotification = response;
    });
  }

  /* Load Foreign Keys  */
  loadCloseTypes() {
    this.closeTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.CLOSING_NOTIFICATIONS_CLOSE_TYPE);
  };
}
