import {Component, Input} from '@angular/core';
import {AgreementModel} from '@models/core';
import {AdministratorFormEnum, SkeletonEnum} from '@shared/enums';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-agreement-administrator',
  templateUrl: './agreement-administrator.component.html',
  styleUrls: ['./agreement-administrator.component.scss']
})
export class AgreementAdministratorComponent {
  @Input({required: true}) agreement!: AgreementModel;

  protected readonly AdministratorFormEnum = AdministratorFormEnum;

  constructor(

  ) {
  }

    protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
}
