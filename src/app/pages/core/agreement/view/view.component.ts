import {Component, inject} from '@angular/core';
import {AgreementModel, AgreementStateModel} from "@models/core";
import {AgreementsHttpService} from "@servicesHttp/core";
import {SkeletonEnum} from "@shared/enums";
import {CoreService} from "@servicesApp/core";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  /** Services **/
  protected readonly agreementsHttpService = inject(AgreementsHttpService);
  protected readonly coreService = inject(CoreService);

  /** Form **/
  protected agreement!: AgreementModel;
  protected agreementState!: AgreementStateModel;

  /** Enums **/
  protected readonly SkeletonEnum = SkeletonEnum;

  constructor() {
    this.findAgreement();
  }

  findAgreement() {
    // this.agreementsHttpService.findOne('').subscribe(agreement => {
    //   this.agreement = agreement;
    // });

    //temp
    this.agreement = JSON.parse(String(sessionStorage.getItem('agreement')));
    this.coreService.isLoading = true;
    this.coreService.isLoading = false;
  }
}
