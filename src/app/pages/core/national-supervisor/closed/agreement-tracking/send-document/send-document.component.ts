import {Component, inject, Input, OnInit} from '@angular/core';
import {ClosedAgreementModel} from "@models/core";
import {ClosedAgreementsHttpService} from "@servicesHttp/core";

@Component({
  selector: 'app-send-document',
  templateUrl: './send-document.component.html',
  styleUrl: './send-document.component.scss'
})
export class SendDocumentComponent implements OnInit{
  @Input() agreementId!: string;

  protected checked: boolean = false;
  protected closedAgreement!: ClosedAgreementModel;

  private readonly closedAgreementsHttpService = inject(ClosedAgreementsHttpService);

  ngOnInit(): void {
    this.findClosedAgreementByAgreement();
  }

  closeAgreement() {
    this.closedAgreementsHttpService.createClose(this.agreementId).subscribe(() => {
      this.checked = true;
      this.findClosedAgreementByAgreement();
    });
  }

  findClosedAgreementByAgreement() {
    this.closedAgreementsHttpService.findClosedAgreementByAgreement(this.agreementId).subscribe(response => {
      if (response) {
        this.checked = true;
        this.closedAgreement = response;
      }
    });
  }
}
