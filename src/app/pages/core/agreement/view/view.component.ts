import {Component, inject, Input, OnInit} from '@angular/core';
import {AgreementModel} from "@models/core";
import {AgreementsHttpService} from "@servicesHttp/core";
import {
  BreadcrumbEnum,
  CatalogueAgreementStatesStateEnum,
  IconButtonActionEnum,
  IdButtonActionEnum,
  LabelButtonActionEnum,
  RoleEnum,
  SkeletonEnum
} from "@shared/enums";
import {BreadcrumbService, CoreService, MessageDialogService, MessageService} from "@servicesApp/core";
import {MenuItem, PrimeIcons} from "primeng/api";
import {AuthService} from "@servicesApp/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  /** Services **/
  protected readonly agreementsHttpService = inject(AgreementsHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected readonly messageDialogService = inject(MessageDialogService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  /** Form **/
  @Input({required: true}) id!: string;
  protected agreement!: AgreementModel;

  /** Enums **/
  protected readonly SkeletonEnum = SkeletonEnum;

  protected buttonActions: MenuItem[] = [];
  protected isButtonActions: boolean = false;
  protected selectedItem!: AgreementModel;

  ngOnInit() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS,routerLink:[`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.AGREEMENT},
    ]);

    this.findAgreement();
  }

  findAgreement() {
    this.agreementsHttpService.findOne(this.id).subscribe(agreement => {
      this.agreement = agreement;
    });
  }

  redirectAgreementLogForm() {
    this.router.navigate(['/core/agreements/log', this.id]);
  }
  redirectTrackingLogList() {
    this.router.navigate([`/core/${this.authService.role.code}/period-list`, this.id]);
  }

  redirectAgreementTerminationList() {
    this.router.navigate([`/core/${this.authService.role.code}/agreement-termination-list`, this.id]
      , {queryParams: {type: 'closing'}});
  }

  redirectClosingProcess() {
    this.router.navigate(['/core/agreement-administrator/closing-process/a', this.id]
      , {queryParams: {type: 'closing'}});
  }

  redirectClosedAgreement() {
    this.router.navigate([`/core/${this.authService.role.code}/closed-agreement`, this.id]);
  }

  selectItem() {
    this.agreementsHttpService.findOne(this.id!).subscribe(agreement => {
      this.validateButtonActions(agreement);
    });
  }

  validateButtonActions(item: AgreementModel) {
    this.buttonActions = [];
    switch (this.authService.role.code){
      case RoleEnum.AGREEMENT_ADMINISTRATOR:
        this.validateButtonAgreementAdministratorActions(item);
        break;
      case RoleEnum.NATIONAL_MANAGER:
      case RoleEnum.INTERNATIONAL_MANAGER:
        this.validateButtonNationalManagerActions(item);
        break;
    }

    if(this.buttonActions.length > 0) {
      this.isButtonActions = true;
    }else {
      this.messageDialogService.successCustom('Información', 'Por el estado del convenio no hay acciones permitidas')
    }
  }

  validateButtonAgreementAdministratorActions(item: AgreementModel): void {

    if (item.initialState?.code === CatalogueAgreementStatesStateEnum.CURRENT) {
      this.buttonActions.push(
        {
          id: IdButtonActionEnum.AGREEMENT_PERIOD,
          label: LabelButtonActionEnum.AGREEMENT_PERIOD,
          icon: IconButtonActionEnum.AGREEMENT_PERIOD,
          command: () => {
            this.redirectTrackingLogList();
          },
        },
        {
          id: IdButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          label: LabelButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          icon: IconButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          command: () => {
            this.redirectAgreementTerminationList();
          },
        },
      );
    }

    if (item.initialState?.code === CatalogueAgreementStatesStateEnum.CLOSING_PROCESS) {
      this.buttonActions.push(
        {
          id: IdButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          label: LabelButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          icon: IconButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          command: () => {
            this.redirectClosingProcess();
          },
        },
      );
    }

    if (item.initialState?.code === CatalogueAgreementStatesStateEnum.CLOSED){

    }
  }

  validateButtonNationalManagerActions(item: AgreementModel): void {

    if (item.initialState?.code === CatalogueAgreementStatesStateEnum.CURRENT) {
      this.buttonActions.push(
        {
          id: IdButtonActionEnum.AGREEMENT_LOG,
          label: LabelButtonActionEnum.AGREEMENT_LOG,
          icon: IconButtonActionEnum.AGREEMENT_LOG,
          command: () => {
            this.redirectAgreementLogForm();
          },
        },
        {
          id: IdButtonActionEnum.AGREEMENT_TRACKING_PERIOD,
          label: LabelButtonActionEnum.MANAGER_AGREEMENT_TRACKING_PERIOD,
          icon: IconButtonActionEnum.MANAGER_AGREEMENT_TRACKING_PERIOD,
          command: () => {
            this.redirectTrackingLogList();
          },
        },
        {
          id: IdButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          label: LabelButtonActionEnum.MANAGER_AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          icon: IconButtonActionEnum.MANAGER_AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          command: () => {
            this.redirectAgreementTerminationList();
          },
        },
        {
          id: IdButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          label: LabelButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          icon: IconButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          command: () => {
            this.redirectClosedAgreement();
          },
        });
    }

    if (item.initialState?.code === CatalogueAgreementStatesStateEnum.CLOSING_PROCESS) {
      this.buttonActions.push(
        {
          id: IdButtonActionEnum.AGREEMENT_LOG,
          label: LabelButtonActionEnum.AGREEMENT_LOG,
          icon: IconButtonActionEnum.AGREEMENT_LOG,
          command: () => {
            this.redirectAgreementLogForm();
          },
        },
        {
          id: IdButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          label: LabelButtonActionEnum.MANAGER_AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          icon: IconButtonActionEnum.MANAGER_AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          command: () => {
            this.redirectAgreementTerminationList();
          },
        },
        {
          id: IdButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          label: LabelButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          icon: IconButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          command: () => {
            this.redirectClosedAgreement();
          },
        });
    }

    if (item.initialState?.code === CatalogueAgreementStatesStateEnum.CLOSED) {
      this.buttonActions.push(
        {
          id: IdButtonActionEnum.AGREEMENT_LOG,
          label: LabelButtonActionEnum.AGREEMENT_LOG,
          icon: IconButtonActionEnum.AGREEMENT_LOG,
          command: () => {
            this.redirectAgreementLogForm();
          },
        },
        {
          id: IdButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          label: LabelButtonActionEnum.MANAGER_AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          icon: IconButtonActionEnum.MANAGER_AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
          command: () => {
            this.redirectAgreementTerminationList();
          },
        },
        {
          id: IdButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          label: LabelButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          icon: IconButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
          command: () => {
            this.redirectClosedAgreement();
          },
        }
      );
    }
  }


  protected readonly PrimeIcons = PrimeIcons;
}
