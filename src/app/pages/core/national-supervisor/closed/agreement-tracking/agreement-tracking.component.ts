import {Component, inject, Input, OnInit} from '@angular/core';
import {BreadcrumbService} from "@servicesApp/core";
import {BreadcrumbEnum} from "@shared/enums";
import {AuthService} from "@servicesApp/auth";
import {ClosedAgreementModel, ClosingLogModel, ClosingNotificationModel} from "@models/core";

@Component({
  selector: 'app-agreement-tracking',
  templateUrl: './agreement-tracking.component.html',
  styleUrl: './agreement-tracking.component.scss'
})
export class AgreementTrackingComponent implements OnInit {
  @Input() agreementId!: string;
  private readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected closingNotification!: ClosingNotificationModel;
  protected closingLog!: ClosingLogModel;
  protected closedAgreement!: ClosedAgreementModel;

  constructor() {

  }

  ngOnInit() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: [`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.AGREEMENT,routerLink:[`/core/agreements/update/${this.agreementId}`]},
      {label: BreadcrumbEnum.AGREEMENT_TRACKING_CLOSED},
    ]);
  }
}
