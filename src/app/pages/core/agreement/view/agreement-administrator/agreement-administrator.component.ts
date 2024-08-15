import {Component, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {AgreementModel} from '@models/core';
import {AdministratorFormEnum, AgreementSectionFormEnum, SkeletonEnum} from '@shared/enums';

@Component({
  selector: 'app-agreement-administrator',
  templateUrl: './agreement-administrator.component.html',
  styleUrls: ['./agreement-administrator.component.scss']
})
export class AgreementAdministratorComponent implements OnInit {
  /** Inputs **/
  @Input({required: true}) agreement!: AgreementModel;

  /** Form **/
  protected readonly AdministratorFormEnum = AdministratorFormEnum;
  protected readonly AgreementSectionFormEnum = AgreementSectionFormEnum;

  /** Attributes **/
  protected userName!: string;

  /** Enums **/
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;

  ngOnInit() {
    this.userName = `${this.agreement.administrator?.user?.name} ${this.agreement.administrator?.user?.lastname}`
  }
}
