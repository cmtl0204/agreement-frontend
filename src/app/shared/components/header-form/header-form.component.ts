import {Component, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {RoutesEnum} from "@shared/enums";

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.scss']
})
export class HeaderFormComponent implements OnInit {
  @Input() id: string | null = null;
  @Input() label: string = '';
  @Input() icon: string = '';

  protected readonly message: string = `Todos los campos con <b class="p-error">*</b> son obligatorios.`;
  protected readonly RoutesEnum = RoutesEnum;

  protected readonly PrimeIcons = PrimeIcons;

  ngOnInit(): void {
    if (!this.icon) {
      if (this.id === RoutesEnum.NEW) {
        this.icon = PrimeIcons.PLUS;
      } else {
        this.icon = PrimeIcons.PENCIL;
      }
    }

    if (!this.label) {
      if (this.id === RoutesEnum.NEW) {
        this.label = "Crear";
      } else {
        this.label = "Editar";
      }
    }
  }
}
