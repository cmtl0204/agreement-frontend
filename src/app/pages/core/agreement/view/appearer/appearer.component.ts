import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService, MessageDialogService, RoutesService } from '@servicesApp/core';
import { CataloguesHttpService } from '@servicesHttp/core';
import { AddendumEnum, SkeletonEnum } from '@shared/enums';
import { InternalInstitutionModel } from '@models/core/internal-institution.model';
import { ExternalInstitution } from '@models/core/external-institution.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-appearer',
  templateUrl: './appearer.component.html',
  styleUrls: ['./appearer.component.scss']
})
export class AppearerComponent implements OnInit {
  ngOnInit(): void { }

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
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;


  /** Data **/
  internalInstitution: InternalInstitutionModel[] = [
    {
      id: '1',
      name: 'Algo',
      positionId: 'Ministro',
      unit: 'Entidad Pública',
      agreementId: 'Algo',
      personTypeId: 'Algo',
      
    },
  ];

  externalInstitution: ExternalInstitution[] = [
    {
      id: '1',
      name: 'Algo',
      position: 'Algo',
      unit: 'personas naturales privadas',
      agreementId: 'Algo',
      personTypeId: 'Algo',
    },
  ];

  constructor(public messageDialogService: MessageDialogService) {
    this.buildForm();
  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
  }
  /** Form Builder & Validates **/
  buildForm() {
    this.form = this.formBuilder.group({

    });
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
