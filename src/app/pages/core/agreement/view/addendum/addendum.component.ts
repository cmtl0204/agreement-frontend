import { Component, inject, Input, OnInit } from '@angular/core';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AddendumEnum, SkeletonEnum } from '@shared/enums';
import { PrimeIcons } from 'primeng/api';
import { AddendumModel } from '@models/core/addendum.model';

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

  /** Enums **/
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  // validation

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

  constructor() { }
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
