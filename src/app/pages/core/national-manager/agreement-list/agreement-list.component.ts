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
import {AgreementsHttpService} from '@servicesHttp/core';
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
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrl: './agreement-list.component.scss'
})
export class AgreementListComponent implements OnInit {

  // Services
  protected readonly authService = inject(AuthService);
  protected readonly coreService = inject(CoreService);
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
    if (this.authService.role.code === RoleEnum.NATIONAL_MANAGER) {
      this.agreementsHttpService.findNationalManagerAgreementsByOrigin()
        .subscribe((response) => {
          // this.paginator = response.pagination!;
          this.items = response;
        });
    }

    if (this.authService.role.code === RoleEnum.INTERNATIONAL_MANAGER) {
      this.agreementsHttpService.findInternationalManagerAgreementsByOrigin()
        .subscribe((response) => {
          // this.paginator = response.pagination!;
          this.items = response;
        });
    }

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
          if (this.selectedItem?.id) this.redirectViewAgreement();
        },
      },
      {
        id: IdButtonActionEnum.AGREEMENT_LOG,
        label: LabelButtonActionEnum.AGREEMENT_LOG,
        icon: IconButtonActionEnum.AGREEMENT_LOG,
        command: () => {
          if (this.selectedItem?.id) this.redirectAgreementLogForm(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.AGREEMENT_TRACKING_PERIOD,
        label: LabelButtonActionEnum.MANAGER_AGREEMENT_TRACKING_PERIOD,
        icon: IconButtonActionEnum.MANAGER_AGREEMENT_TRACKING_PERIOD,
        command: () => {
          if (this.selectedItem?.id) this.redirectTrackingLogList(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
        label: LabelButtonActionEnum.MANAGER_AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
        icon: IconButtonActionEnum.MANAGER_AGREEMENT_CLOSING_MANAGEMENT_SUPERVISION,
        command: () => {
          if (this.selectedItem?.id) this.redirectAgreementTerminationList(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
        label: LabelButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
        icon: IconButtonActionEnum.MANAGER_AGREEMENT_CLOSED,
        command: () => {
          if (this.selectedItem?.id) this.redirectClosedAgreement(this.selectedItem.id);
        },
      },
    ];
  }

  validateButtonActions(item: AgreementModel) {
    this.buildButtonActions();
  }

  redirectCreateForm() {
    this.agreementsService.clearAgreement();

    this.router.navigate(['/core/agreements', 'register']);
  }

  redirectViewAgreement() {
    this.isVisibleAgreementView = true;
  }

  redirectAgreementLogForm(id: string) {
    this.router.navigate(['/core/agreements/log', id]);
  }

  redirectTrackingLogList(id: string) {
    this.router.navigate([`/core/${this.authService.role.code}/period-list`, id]);
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
      this.selectedItem = item;
      this.validateButtonActions(item);
      this.agreementsService.agreement = agreement;
    });
  }

  redirectAgreementTerminationList(id: string) {
    this.router.navigate([`/core/${this.authService.role.code}/agreement-termination-list`, id]
      , {queryParams: {type: 'closing'}});
  }

  redirectClosedAgreement(id: string) {
    this.router.navigate([`/core/${this.authService.role.code}/closed-agreement`, id]);
  }
}
