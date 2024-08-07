import {Component, inject, Input, OnInit} from '@angular/core';
import {AgreementModel, AgreementStateModel} from "@models/core";
import {AgreementsHttpService} from "@servicesHttp/core";
import {SkeletonEnum} from "@shared/enums";
import {CoreService} from "@servicesApp/core";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  /** Services **/
  protected readonly agreementsHttpService = inject(AgreementsHttpService);
  protected readonly coreService = inject(CoreService);

  /** Form **/
  @Input({required: true}) id!: string;
  protected agreement!: AgreementModel;

  /** Enums **/
  protected readonly SkeletonEnum = SkeletonEnum;

  ngOnInit() {
    this.findAgreement();
  }

  findAgreement() {
    this.agreementsHttpService.findOne(this.id).subscribe(agreement => {
      this.agreement = agreement;
    });
  }
}
