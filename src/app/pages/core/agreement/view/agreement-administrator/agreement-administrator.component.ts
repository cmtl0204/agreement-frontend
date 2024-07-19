import { Component } from '@angular/core';
import { CatalogueModel } from '@models/core';
import { RoutesEnum, AdministratorFormEnum } from '@shared/enums';
import { CoreService } from '@servicesApp/core'; // Importa el servicio
import { PrimeIcons } from 'primeng/api'; // Importa PrimeIcons de PrimeNG

@Component({
  selector: 'app-agreement-administrator',
  templateUrl: './agreement-administrator.component.html',
  styleUrls: ['./agreement-administrator.component.scss']
})
export class AgreementAdministratorComponent {
  id: string = RoutesEnum.NEW;

  units: CatalogueModel[] = [
    { id: '1', name: 'Unit 1' },
    { id: '2', name: 'Unit 2' }
  ];
  positions: CatalogueModel[] = [
    { id: '1', name: 'Position 1' },
    { id: '2', name: 'Position 2' }
  ];

  readonly PrimeIcons = PrimeIcons;
  constructor(
    public coreService: CoreService // Cambia a público
  ) {}

  selectedUnit = this.units[0]; // Seleccionar Unit 1 por defecto
  selectedPosition = this.positions[0]; // Seleccionar Position 1 por defecto

  protected readonly AdministratorFormEnum = AdministratorFormEnum;

  /*constructor(
    public coreService: CoreService // Cambia a público
  ) {}*/
}
