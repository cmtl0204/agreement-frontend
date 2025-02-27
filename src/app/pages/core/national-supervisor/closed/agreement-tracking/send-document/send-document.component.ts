import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ClosedAgreementModel, ClosingLogModel, ClosingNotificationModel} from "@models/core";
import {ClosedAgreementsHttpService} from "@servicesHttp/core";
import {MessageDialogService} from "@servicesApp/core";
import {ConfirmationService, PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-send-document',
  templateUrl: './send-document.component.html',
  styleUrl: './send-document.component.scss'
})
export class SendDocumentComponent implements OnInit {
  @Input() agreementId!: string;
  @Input() closingLog!: ClosingLogModel;
  @Output() closedAgreementOut: EventEmitter<ClosedAgreementModel>= new EventEmitter<ClosedAgreementModel>();

  protected checked: boolean = false;
  protected closedAgreement!: ClosedAgreementModel;

  private readonly closedAgreementsHttpService = inject(ClosedAgreementsHttpService);
  private readonly confirmationService = inject(ConfirmationService);
  protected readonly messageDialogService = inject(MessageDialogService);

  ngOnInit(): void {
    this.findClosedAgreementByAgreement();
  }

  closeAgreement() {
    if (this.closingLog) {
      this.confirmationService.confirm({
        key: 'confirmDialog',
        message: '¿Está seguro de enviar los documentos ingresados para la terminación y gestión de cierre del convenio, una vez enviados no podrán ser modificados?',
        header: '',
        icon: PrimeIcons.QUESTION_CIRCLE,
        acceptLabel: "Si",
        rejectLabel: "No",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.closedAgreementsHttpService.createClose(this.agreementId).subscribe(() => {
            this.checked = true;
            this.findClosedAgreementByAgreement();
          });
        }
      });
    } else {
      this.messageDialogService.errorCustom('Importante!', 'Es necesario subir los documentos habilitantes para el cierre del convenio antes de notificar el cierre del convenio.');
    }
  }

  findClosedAgreementByAgreement() {
    this.closedAgreementsHttpService.findClosedAgreementByAgreement(this.agreementId).subscribe(response => {
      if (response) {
        this.closedAgreementOut.emit(response);
        this.checked = true;
        this.closedAgreement = response;
      }
    });
  }
}
