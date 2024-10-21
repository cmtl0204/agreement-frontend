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
    if (this.authService.role.code === RoleEnum.NATIONAL_SUPERVISOR) {
      this.agreementsHttpService.findNationalAgreementsByOrigin()
        .subscribe((response) => {
          // this.paginator = response.pagination!;
          this.items = response;
        });
    }

    if (this.authService.role.code === RoleEnum.INTERNATIONAL_SUPERVISOR) {
      this.agreementsHttpService.findInternationalAgreementsByOrigin()
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
        id: IdButtonActionEnum.COMPLETE,
        label: LabelButtonActionEnum.COMPLETE,
        icon: IconButtonActionEnum.COMPLETE,
        command: () => {
          if (this.selectedItem?.id) this.redirectCompleteForm(this.selectedItem);
        },
      },
      {
        id: IdButtonActionEnum.AGREEMENT,
        label: LabelButtonActionEnum.AGREEMENT,
        icon: IconButtonActionEnum.AGREEMENT,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
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
        id: IdButtonActionEnum.AGREEMENT_PERIOD,
        label: LabelButtonActionEnum.AGREEMENT_PERIOD,
        icon: IconButtonActionEnum.AGREEMENT_PERIOD,
        command: () => {
          if (this.selectedItem?.id) this.redirectTrackingLogList(this.selectedItem.id);
        },
      },
      // {
      //   id: IdButtonActionEnum.REACTIVATE,
      //   label: LabelButtonActionEnum.REACTIVATE,
      //   icon: IconButtonActionEnum.REACTIVATE,
      //   command: () => {
      //     if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
      //   },
      // },
    ];
  }

  validateButtonActions(item: AgreementModel) {
    this.buildButtonActions();

    if (item.enabled) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.COMPLETE), 1);
    }

    if (!item.enabled) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.VIEW), 1);
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.EDIT), 1);
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.AGREEMENT_LOG),1);
    }

    //   if (!item.suspendedAt) {
    //     this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.REACTIVATE), 1);
    //   }
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
}
