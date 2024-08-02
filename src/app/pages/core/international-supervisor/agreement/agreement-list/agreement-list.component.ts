import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnModel, AgreementModel } from '@models/core';
import { CoreService, BreadcrumbService, MessageService} from '@servicesApp/core';
import { AgreementsHttpService } from '@servicesHttp/core';
import { IconButtonActionEnum, SeverityButtonActionEnum, LabelButtonActionEnum, BreadcrumbEnum, IdButtonActionEnum, TableEnum, AgreementFormEnum, AgreementStateEnum } from '@shared/enums';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrl: './agreement-list.component.scss'
})
export class AgreementListComponent {

  protected readonly PrimeIcons = PrimeIcons;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly BreadcrumbEnum = BreadcrumbEnum;
  protected readonly TableEnum = TableEnum;
  // protected paginator: PaginatorModel;
  protected readonly messageService = inject(MessageService)

  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected isButtonActions: boolean = false;

  protected columns: ColumnModel[] = this.buildColumns;

  protected search: FormControl = new FormControl('');

  protected selectedItem!: AgreementModel;
  protected items: AgreementModel[] = [];

  constructor(
    protected readonly coreService: CoreService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly router: Router,
    private readonly agreementsHttpService: AgreementsHttpService,
  ) {
    this.breadcrumbService.setItems([{ label: BreadcrumbEnum.AGREEMENTS }]);

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
    this.agreementsHttpService.findAllAgreements()
      .subscribe((response) => {
        console.log(response)
        // this.paginator = response.pagination!;
        this.items = response;
      });
  }
  
  findOne(id: string) {
    this.agreementsHttpService.findOne(id)
    .subscribe((response) => {
        console.log(response)
        // this.selectedItem = response;
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      { field: 'name', header: AgreementFormEnum.name },
      { field: 'internalNumber', header: AgreementFormEnum.internalNumber },
      { field: 'number', header: AgreementFormEnum.number },
      { field: 'startedAt', header: AgreementFormEnum.startedAt },
      { field: 'endedAt', header: AgreementFormEnum.endedAt },
      { field: 'agreementState', header: AgreementStateEnum.state }
    ];
  }

  /** Button Actions**/
  get buildButtonActions(): MenuItem[] {
    return [
      {
        id: IdButtonActionEnum.UPDATE,
        label: LabelButtonActionEnum.VIEW,
        icon: IconButtonActionEnum.UPDATE,
        command: () => {
          if (this.selectedItem?.id) this.redirectViewAgreement(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.UPDATE,
        label: LabelButtonActionEnum.UPDATE,
        icon: IconButtonActionEnum.UPDATE,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.DELETE,
        label: LabelButtonActionEnum.DELETE,
        icon: IconButtonActionEnum.DELETE,
        command: () => {
          if (this.selectedItem?.id) this.remove(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.SUSPEND,
        label: LabelButtonActionEnum.SUSPEND,
        icon: IconButtonActionEnum.SUSPEND,
        command: () => {
          if (this.selectedItem?.id) this.suspend(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.REACTIVATE,
        label: LabelButtonActionEnum.REACTIVATE,
        icon: IconButtonActionEnum.REACTIVATE,
        command: () => {
          if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },
      },
    ];
  }

  redirectCreateForm() {
    this.router.navigate(['/core/international-supervisor/agreements', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/core/international-supervisor/agreements', id]);
  }

  redirectViewAgreement(id: string) {
    // this.router.navigate(['/core/agreements/view', id]);
    this.router.navigate(['/core/agreements/view']); //review
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

  removeAll() {
    // this.messageService.questionDelete().then((result) => {
    //   if (result.isConfirmed) {
    //     this.agreementsHttpService.removeAll(this.selectedItems).subscribe((users) => {
    //       this.selectedItems.forEach(userDeleted => {
    //         this.items = this.items.filter(user => user.id !== userDeleted.id);
    //         this.paginator.totalItems--;
    //       });
    //       this.selectedItems = [];
    //     });
    //   }
    // });
  }

  suspend(id: string) {
    // this.agreementsHttpService.suspend(id).subscribe(user => {
    //   const index = this.items.findIndex(user => user.id === id);
    //   this.items[index] = user;
    // });
  }

  reactivate(id: string) {
    // this.agreementsHttpService.reactivate(id).subscribe(user => {
    //   const index = this.items.findIndex(user => user.id === id);
    //   this.items[index] = user;
    // });
  }

  validateButtonActions(item: AgreementModel): void {
  //   this.buttonActions = this.buildButtonActions;

  //   if (item.suspendedAt) {
  //     this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.SUSPEND), 1);
  //   }

  //   if (!item.suspendedAt) {
  //     this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.REACTIVATE), 1);
  //   }
  }

  paginate(event: any) {
    // this.findAgreements(event.page);
  }

  selectItem(item: AgreementModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    this.validateButtonActions(item);
  }

}
