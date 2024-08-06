import {Component, inject, Input, OnInit} from '@angular/core';
import { AgreementModel, ObligationModel } from '@models/core';
import {CoreService} from "@servicesApp/core";
import {CompanyRegistrationFormEnum} from "@shared/enums";

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.scss']
})
export class ObligationComponent implements OnInit {

  /** Services **/
  protected readonly coreService = inject(CoreService);

  /** Form **/
  @Input() id!: string;
  @Input({required: true}) agreement!:AgreementModel;


  /** Enums **/
  protected readonly CompanyRegistrationFormEnum = CompanyRegistrationFormEnum;

  //validation
  obligations:ObligationModel[] = [];

  expandedRows: { [key: string]: boolean } = {};
  expandedObligationDetailRows: { [key: string]: boolean } = {};

  constructor() {
  }

  ngOnInit(): void {
    if(this.agreement && this.agreement.obligations){
      this.obligations = this.agreement.obligations;
    } 
  }


  expandAll() {
    this.expandedRows = this.obligations.reduce((acc: { [key: string]: boolean }, o: ObligationModel) => {
      acc[o.id] = true; 
      return acc;
    }, {});
  
    this.expandedObligationDetailRows = this.obligations.reduce((acc: { [key: string]: boolean }, o: ObligationModel) => {
      if (o.obligationDetails) { 
        o.obligationDetails.forEach((detail, index) => {
          acc[`${o.id}-${index}`] = true; 
        });
      }
      return acc;
    }, {});
  }

  collapseAll() {
    this.expandedRows = {};
    this.expandedObligationDetailRows = {};
  }

}
