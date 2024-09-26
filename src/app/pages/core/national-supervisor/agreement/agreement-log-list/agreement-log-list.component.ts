import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ColumnModel, AgreementModel, AgreementLogModel} from '@models/core';
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
  AdministratorFormEnum, RoleEnum
} from '@shared/enums';
import {PrimeIcons, MenuItem} from 'primeng/api';
import {debounceTime} from 'rxjs';
import {AuthService} from "@servicesApp/auth";

@Component({
  selector: 'app-agreement-log-list',
  templateUrl: './agreement-log-list.component.html',
  styleUrl: './agreement-log-list.component.scss'
})
export class AgreementLogListComponent implements OnInit {
  @Input() agreementId!: string;

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

  protected selectedItem!: AgreementModel;
  protected items: AgreementLogModel[] = [];
  protected isVisibleAgreementView: boolean = false;

  constructor() {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.AGREEMENTS}]);

    this.buildButtonActions();
    this.buildColumns();
  }

  ngOnInit() {
    this.findAgreementLogsByAgreement();
  }

  findAgreementLogsByAgreement() {
    this.agreementLogsHttpService.findAgreementLogsByAgreement(this.agreementId).subscribe(response => {
      this.items = response;
    });
  }

  buildColumns() {
    this.columns = [
      {field: 'number', header: AgreementFormEnum.number},
      {field: 'internalNumber', header: AgreementFormEnum.internalNumber},
      {field: 'name', header: AgreementFormEnum.name},
      {field: 'administrator', header: AdministratorFormEnum.header},
      {field: 'agreementState', header: AgreementStateEnum.state},
      {field: 'subscribedAt', header: AgreementFormEnum.subscribedAt},
      {field: 'endedAt', header: AgreementFormEnum.endedAt},
      {field: 'isFinancing', header: AgreementFormEnum.isFinancing},
      {field: 'enabled', header: AgreementFormEnum.enabled}
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
          this.redirectViewAgreement();
        },
      },
    ];
  }

  redirectCreateForm() {
    this.agreementsService.clearAgreement();

    this.router.navigate(['/core/agreements', 'register']);
  }

  redirectCompleteForm(item: AgreementModel) {
    this.router.navigate(['/core/agreements', 'register']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/core/agreements/update', id]);
  }

  redirectViewAgreement() {
    this.messageDialogService.successCustom('Sitio en construcción', 'Pronto estará disponible');
    return;

    this.isVisibleAgreementView = true;
  }

  remove(id: string) {
    // this.messageService.questionDelete()
    //   .then((result) => {
    //     if (result.isConfirmed) {
    //       this.agreementsHttpService.remove(id).subscribe((user) => {
    //         this.items = this.items.filter(item => item.id !== user.id);
    //         this.paginator.totalItems--;
    //       });
    //     }
    //   });
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

  paginate(event: any) {
    // this.findAgreements(event.page);
  }

  selectItem(item: AgreementModel) {
    this.agreementsHttpService.findOne(item.id!).subscribe(agreement => {
      this.isButtonActions = true;
      this.selectedItem = item;
      this.validateButtonActions(item);
      this.agreementsService.agreement = agreement;
    });
  }
}
