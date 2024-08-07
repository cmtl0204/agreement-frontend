import {Component, Input, OnInit} from '@angular/core';
import {AgreementModel} from '@models/core';
import {AdministratorFormEnum, SkeletonEnum} from '@shared/enums';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-agreement-administrator',
  templateUrl: './agreement-administrator.component.html',
  styleUrls: ['./agreement-administrator.component.scss']
})
export class AgreementAdministratorComponent implements OnInit{
  @Input({required: true}) agreement!: AgreementModel;

  protected readonly AdministratorFormEnum = AdministratorFormEnum;

  protected userName!: string;

  constructor() {

  }

  ngOnInit() {
    this.userName = `${this.agreement.administrator?.user?.name} ${this.agreement.administrator?.user?.lastname}`
  }

  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
}
