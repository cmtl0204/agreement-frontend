import {Component, inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ColumnModel, AgreementModel} from '@models/core';
import {
  CoreService,
  BreadcrumbService,
  MessageService,
  AgreementsService,
  MessageDialogService
} from '@servicesApp/core';
import {AdministratorsHttpService, AgreementsHttpService} from '@servicesHttp/core';
import {
  IconButtonActionEnum,
  SeverityButtonActionEnum,
  LabelButtonActionEnum,
  BreadcrumbEnum,
  IdButtonActionEnum,
  TableEnum,
  AgreementFormEnum,
  AgreementStateEnum,
  AdministratorFormEnum, RoleEnum, CatalogueAgreementStatesStateEnum
} from '@shared/enums';
import {PrimeIcons, MenuItem} from 'primeng/api';
import {debounceTime} from 'rxjs';
import {AuthService} from "@servicesApp/auth";

@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrl: './agreement-list.component.scss'
})
export class AgreementListComponent implements OnInit {

  // Services
  protected readonly authService = inject(AuthService);
  protected readonly coreService = inject(CoreService);
  private readonly administratorsHttpService = inject(AdministratorsHttpService);
  private readonly agreementsHttpService = inject(AgreementsHttpService);
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
  protected items: AgreementModel[] = [];
  protected isVisibleAgreementView: boolean = false;

  constructor() {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.AGREEMENTS}]);

    this.buildButtonActions();
    this.buildColumns();
    // this.paginator = this.coreService.paginator;

    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.findAgreements();
    });
  }

  ngOnInit() {
    this.findAgreements();
  }

  findAgreements() {
    this.administratorsHttpService.findAgreementsByAdministrator(this.authService.auth.id)
      .subscribe((response) => {
        // this.paginator = response.pagination!;
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
        id: IdButtonActionEnum.AGREEMENT,
        label: LabelButtonActionEnum.AGREEMENT,
        icon: IconButtonActionEnum.AGREEMENT,
        command: () => {
          this.redirectViewAgreement();
        },
      },
    ];
  }

  validateButtonActions(item: AgreementModel): void {
    this.buildButtonActions();

    console.log(item)
    if (item.initialState?.code === CatalogueAgreementStatesStateEnum.CURRENT) {
      this.buttonActions.push(
        {
          id: IdButtonActionEnum.AGREEMENT_PERIOD,
          label: LabelButtonActionEnum.AGREEMENT_PERIOD,
          icon: IconButtonActionEnum.AGREEMENT_PERIOD,
          command: () => {
            if (this.selectedItem?.id) this.redirectTrackingLogList(this.selectedItem.id);
          },
        },
        {
          id: IdButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          label: LabelButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          icon: IconButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_ADMINISTRATOR,
          command: () => {
            if (this.selectedItem?.id) this.redirectAgreementTerminationList(this.selectedItem.id);
          },
        },
      );
    }
  }

  redirectViewAgreement() {
    this.isVisibleAgreementView = true;
  }

  redirectTrackingLogList(id: string) {
    this.router.navigate(['/core/agreement-administrator/period-list', id]
      , {queryParams: {type: 'execution'}});
  }

  redirectAgreementTerminationList(id: string) {
    this.router.navigate(['/core/agreement-administrator/agreement-termination-list', id]
      , {queryParams: {type: 'closing'}});
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

  paginate(event: any) {
    // this.findAgreements(event.page);
  }

  selectItem(item: AgreementModel) {
    this.agreementsHttpService.findOne(item.id!).subscribe(agreement => {
      this.isButtonActions = true;
      this.selectedItem = agreement;
      this.validateButtonActions(agreement);
      this.agreementsService.agreement = agreement;
    });
  }
}
