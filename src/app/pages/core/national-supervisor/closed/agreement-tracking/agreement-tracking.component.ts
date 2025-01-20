import {Component, inject, Input} from '@angular/core';
import {BreadcrumbService} from "@servicesApp/core";
import {BreadcrumbEnum} from "@shared/enums";
import {AuthService} from "@servicesApp/auth";
import {ClosingLogModel, ClosingNotificationModel} from "@models/core";

@Component({
  selector: 'app-agreement-tracking',
  templateUrl: './agreement-tracking.component.html',
  styleUrl: './agreement-tracking.component.scss'
})
export class AgreementTrackingComponent {
  @Input() agreementId!: string;
  private readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected closingNotification!: ClosingNotificationModel;
  protected closingLog!: ClosingLogModel;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS, routerLink: [`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.PERIODS_CLOSING_ADMINISTRATOR},
    ]);
  }
}
