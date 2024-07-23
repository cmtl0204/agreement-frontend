import {Component, Input} from '@angular/core';
import {AgreementModel} from '@models/core';
import { AdministratorFormEnum} from '@shared/enums';

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
}
