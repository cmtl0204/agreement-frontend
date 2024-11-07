import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ColumnModel, AgreementModel, AgreementLogModel, AgreementLogDetailModel} from '@models/core';
import {
  CoreService,
  BreadcrumbService,
  MessageService,
  AgreementsService,
  MessageDialogService
} from '@servicesApp/core';
import {AgreementLogsHttpService, AgreementsHttpService} from '@servicesHttp/core';
import {
  IconButtonActionEnum,
  SeverityButtonActionEnum,
  LabelButtonActionEnum,
  BreadcrumbEnum,
  IdButtonActionEnum,
  TableEnum,
  AgreementFormEnum,
  AgreementStateEnum,
  AdministratorFormEnum, RoleEnum, AgreementLogEnum, SkeletonEnum
} from '@shared/enums';
import {PrimeIcons, MenuItem} from 'primeng/api';
import {AuthService} from "@servicesApp/auth";
import {getFormattedDate} from "@shared/helpers";
import {format} from "date-fns";

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  agreementLogDetails?: AgreementLogDetailModel[];
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent implements OnInit {
  @Input() id!: string;

  // Services
  protected readonly authService = inject(AuthService);
  protected readonly coreService = inject(CoreService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
  private readonly agreementLogsHttpService = inject(AgreementLogsHttpService);
  private readonly agreementsService = inject(AgreementsService);
  private readonly router = inject(Router);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected readonly PrimeIcons = PrimeIcons;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly BreadcrumbEnum = BreadcrumbEnum;
  protected readonly TableEnum = TableEnum;
  // protected paginator: PaginatorModel;
  protected readonly messageService = inject(MessageService);
  protected readonly messageDialogService = inject(MessageDialogService);

  protected buttonActions: MenuItem[] = [];
  protected isButtonActions: boolean = false;

  protected columns: ColumnModel[] = [];

  protected search: FormControl = new FormControl('');

  protected agreement!: AgreementModel;
  protected items: AgreementLogDetailModel[] = [];
  protected events: EventItem[] = [];
  protected isVisibleAgreementView: boolean = false;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.AGREEMENTS,routerLink:[`/core/${this.authService.role.code}/agreement-list`]},
      {label: BreadcrumbEnum.AGREEMENTS_LOG},
    ]);

    this.buildButtonActions();
    this.buildColumns();
  }

  ngOnInit() {
    this.findAgreementLogsByAgreement();
  }

  findAgreementLogsByAgreement() {
    this.agreementLogsHttpService.findAgreementLogsByAgreement(this.id).subscribe(response => {
      this.items = response;

      if (this.items.length > 0) {
        this.agreement = this.items[0].agreementLog?.agreement!;
      }
    });
  }

  buildColumns() {
    this.columns = [
      {field: 'registeredAt', header: AgreementLogEnum.registeredAt},
      {field: 'user', header: AgreementLogEnum.user},
    ];
  }

  /** Button Actions**/
  buildButtonActions() {
    this.buttonActions = [
      {
        id: IdButtonActionEnum.VIEW,
        label: LabelButtonActionEnum.VIEW,
        icon: IconButtonActionEnum.VIEW,
        command: () => {
          this.redirectCreateForm();
        },
      },
    ];
  }

  redirectCreateForm() {
    this.agreementsService.clearAgreement();

    this.router.navigate(['/core/agreements', 'register']);
  }

  validateButtonActions(item: AgreementModel): void {
    this.buildButtonActions();

    if (item.enabled) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.COMPLETE), 1);
    }

    if (!item.enabled) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.VIEW), 1);
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.EDIT), 1);
    }

    //   if (!item.suspendedAt) {
    //     this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.REACTIVATE), 1);
    //   }
  }

  selectItem(item: AgreementModel) {
    this.agreementsHttpService.findOne(item.id!).subscribe(agreement => {
      this.isButtonActions = true;
      this.agreement = item;
      this.validateButtonActions(item);
      this.agreementsService.agreement = agreement;
    });
  }

  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly AgreementLogEnum = AgreementLogEnum;

  downloadLogsByAgreement() {
    this.agreementLogsHttpService.downloadLogsByAgreement(this.id);
  }
}
