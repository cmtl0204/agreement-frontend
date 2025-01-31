import {Component, Input} from '@angular/core';
import {ClosingNotificationModel} from "@models/core";

@Component({
  selector: 'app-closing-process',
  templateUrl: './closing-process.component.html',
  styleUrl: './closing-process.component.scss'
})
export class ClosingProcessComponent {
  @Input({required: true}) agreementId!: string;
  protected closingNotification!: ClosingNotificationModel;
}
