import {Component, inject} from '@angular/core';
import {
  AgreementFormEnum,
  CatalogueAgreementStatesStateEnum,
  CatalogueTypeEnum, IconButtonActionEnum,
  LabelButtonActionEnum, RoleEnum, SeverityButtonActionEnum
} from "@shared/enums";
import {FormControl} from "@angular/forms";
import {CatalogueModel} from "@models/core";
import {AgreementsHttpService, CataloguesHttpService} from "@servicesHttp/core";
import {AuthService} from "@servicesApp/auth";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  protected readonly authService = inject(AuthService);
  protected readonly agreementsHttpService = inject(AgreementsHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly AgreementFormEnum = AgreementFormEnum;
  protected stateFieldControl = new FormControl(null);
  protected states: CatalogueModel[] = [];

  constructor() {
    this.loadTypes();
  }

  loadTypes() {
    this.states = this.cataloguesHttpService.findByType(CatalogueTypeEnum.AGREEMENT_STATES_STATE);
  };

  protected readonly CatalogueAgreementStatesStateEnum = CatalogueAgreementStatesStateEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;

  downloadReport() {
    if (this.stateFieldControl.value) {
      switch (this.authService.role.code) {
        case RoleEnum.AGREEMENT_ADMINISTRATOR:
          this.agreementsHttpService.downloadReport('administrator', this.stateFieldControl.value);
          break;

        case RoleEnum.INTERNATIONAL_MANAGER:
        case RoleEnum.INTERNATIONAL_SUPERVISOR:
          this.agreementsHttpService.downloadReport('international', this.stateFieldControl.value);
          break;

        case RoleEnum.NATIONAL_SUPERVISOR:
        case RoleEnum.NATIONAL_MANAGER:
          this.agreementsHttpService.downloadReport('national', this.stateFieldControl.value);
          break;
      }
    }
  }

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
}
