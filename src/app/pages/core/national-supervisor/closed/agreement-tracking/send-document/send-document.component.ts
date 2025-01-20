import {Component, inject, Input, OnInit} from '@angular/core';
import {ClosedAgreementModel, ClosingLogModel, ClosingNotificationModel} from "@models/core";
import {ClosedAgreementsHttpService} from "@servicesHttp/core";
import {MessageDialogService} from "@servicesApp/core";

@Component({
  selector: 'app-send-document',
  templateUrl: './send-document.component.html',
  styleUrl: './send-document.component.scss'
})
export class SendDocumentComponent implements OnInit {
  @Input() agreementId!: string;
  @Input() closingLog!: ClosingLogModel;

  protected checked: boolean = false;
  protected closedAgreement!: ClosedAgreementModel;

  private readonly closedAgreementsHttpService = inject(ClosedAgreementsHttpService);
  protected readonly messageDialogService = inject(MessageDialogService);

  ngOnInit(): void {
    this.findClosedAgreementByAgreement();
  }

  closeAgreement() {
    console.log(this.closingLog);
    if (this.closingLog) {
      this.closedAgreementsHttpService.createClose(this.agreementId).subscribe(() => {
        this.checked = true;
        this.findClosedAgreementByAgreement();
      });
    } else {
      this.messageDialogService.errorCustom('Importante!', 'Es necesario subir los documentos habilitantes para el cierre del convenio antes de notificar el cierre del convenio.');
    }
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
