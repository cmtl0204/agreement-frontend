import { Component, inject, Input, OnInit } from '@angular/core';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AddendumEnum, SkeletonEnum } from '@shared/enums';
import { PrimeIcons,MessageService } from 'primeng/api';
import { AddendumModel } from '@models/core/addendum.model';
import { CatalogueModel, ColumnModel } from '@models/core';


@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrl: './addendum.component.scss'
})
export class AddendumComponent implements OnInit {

  /** Services **/
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly routesService = inject(RoutesService);
  public readonly messageDialogService = inject(MessageDialogService);


  /** Form **/
  protected columns: ColumnModel[] = [];
  protected addendumColumns: ColumnModel[]=[];

  /** Foreign Keys **/
  protected addendumPersonTypes: CatalogueModel[]=[];
  protected positions: CatalogueModel[] = [];

  /** Enums **/
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  // constructor
  constructor(private messageService: MessageService) {
    this.buildaddendumColumns();

  }
  buildaddendumColumns() {
    this.addendumColumns = [
      {
        field: 'isAddendum', header: AddendumEnum.isAddendum
      },
      {
        field: 'description', header: AddendumEnum.description
      },
      {
        field: 'isModifiedFinishDate', header: AddendumEnum.isModifiedFinishDate
      },
      {
        field: 'document', header: AddendumEnum.document
      },
      {
        field: 'agreementEndedAt', header: AddendumEnum.agreementEndedAt
      },
    ];
  }

  addendums: AddendumModel[] = [
    {
      id: "1",
      agreementId: "1",
      isAddendum: true,
      description: "Descripcion",
      isModifiedFinishDate: true,
      agreementEndedAt: new Date("2019-01-04"),
    }
  ];

  ngOnInit(): void {

  }

  findAgrement() {

  }

  /** Redirects **/
  redirectRegistration() {
    // this.messageDialogService.questionOnExit().subscribe(result => {
    //   if (result) {
    //     this.onLeave = true;
    //     this.routesService.registration();
    //   } else {
    //     this.onLeave = false;
    //   }
    // });

    this.routesService.registration();
  }
}
