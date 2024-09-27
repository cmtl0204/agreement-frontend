import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {IconButtonActionEnum, LabelButtonActionEnum, SeverityButtonActionEnum} from "@shared/enums";
import {CoreService} from "@servicesApp/core";

@Component({
  selector: 'app-form-button-action',
  templateUrl: './form-button-action.component.html',
  styleUrl: './form-button-action.component.scss'
})
export class FormButtonActionComponent {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Input() labelSubmitButton: string = LabelButtonActionEnum.SAVE;
  @Input() labelCancelButton: string = LabelButtonActionEnum.RETURN;
  @Input() iconSubmitButton: string = IconButtonActionEnum.SAVE;
  @Input() iconCancelButton: string = IconButtonActionEnum.RETURN;
  @Input() severitySubmitButton = SeverityButtonActionEnum.SAVE;
  @Input() severityCancelButton = SeverityButtonActionEnum.RETURN;
  @Input() isVisibleCancelButton = true;
  @Input() isVisibleSubmitButton = true;

  protected readonly coreService = inject(CoreService);

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
