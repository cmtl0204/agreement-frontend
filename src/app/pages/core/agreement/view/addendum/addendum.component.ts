import { Component, inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AddendumEnum, RoutesEnum, SkeletonEnum } from '@shared/enums';
import { PrimeIcons } from 'primeng/api';

import { AddendumModel } from '@models/core/addendum.model'
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrl: './addendum.component.scss'
})
export class AddendumComponent implements OnInit {

  ngOnInit(): void {

  }
  /** Services **/
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly routesService = inject(RoutesService);

  /** Form **/
  @Input({ required: true }) id!: string;
  protected form!: FormGroup;

  /** Enums **/
  protected readonly AddendumEnum = AddendumEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  // validation

  addendums: AddendumModel[] =[
    {
      id: "1",
      agreementId: "1",
      isAddeddum: true,
      description: "Descripcion",
      isModifiedFinishDate: true,
      agreementEndedAt: "2024-12-31T23:59:59Z" ,
    }
  ];
  
  constructor(public messageDialogService: MessageDialogService) {
    this.buildForm();
  }
  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
  }

  buildForm() {
    this.form = this.formBuilder.group({

    })
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
