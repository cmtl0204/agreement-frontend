import { Component, inject,Input, OnInit } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { OnExitInterface } from "@shared/interfaces";
import { CoreService, MessageDialogService } from "@servicesApp/core";
import { CompanyRegistrationFormEnum} from "@shared/enums";
import { AgreementModel, FinancingModel } from '@models/core';

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.scss']
})
export class FinancingComponent implements OnExitInterface {
  /** Services **/
  protected readonly coreService = inject(CoreService);

  /** Form **/
  @Input({required: true}) agreement!:AgreementModel;
  @Input() id!: string;


  /** Enums **/
  protected readonly CompanyRegistrationFormEnum = CompanyRegistrationFormEnum;

  agreements: AgreementModel[] = [];


  constructor(public messageDialogService: MessageDialogService) {

  }

  async onExit() {
    const res = await firstValueFrom(this.messageDialogService.questionOnExit());
    console.log(res);
    return res;
  }

  

}
