import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LabelButtonActionEnum} from "@shared/enums";
import {MenuItem} from "primeng/api";
import {format} from "date-fns";

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss']
})
export class ButtonActionComponent {
  @Input() enabled: boolean = false;
  @Input() buttonActions: MenuItem[] = [];
  @Output() isHide: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected currentYear: string;

  constructor() {
    this.currentYear = format(new Date(), 'yyyy');
  }

}
