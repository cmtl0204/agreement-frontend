import {Component, Input} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {RoutesEnum} from "@shared/enums";

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.scss']
})
export class HeaderFormComponent {
  protected readonly PrimeIcons = PrimeIcons;
  @Input() id: string | null = null;
  @Input() panelHeader: string | null = null;

  constructor() {

  }

    protected readonly RoutesEnum = RoutesEnum;
}
